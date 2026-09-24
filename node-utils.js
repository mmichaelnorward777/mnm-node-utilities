import { fork, execFile } from 'child_process';
import * as path from "path";
import * as os from 'os';
import * as fs from 'fs';

export default function getNodeUtils({ checkDirPathPermissions, getUserAllowedPaths }) {

    // Strict list of explicitly banned system binaries
    const BANNED_BINARIES = new Set([
        'git', // Explicitly block git execution vectors
        'rm', 'shred', 'dd', 'mkfs', 'truncate', 
        'mv', 'chmod', 'chown', 'ln', 
        'kill', 'pkill', 'top', 'ps', 
        'sh', 'bash', 'zsh', 'cmd', 'powershell',
        'cat', 'less', 'more', 'tail', 'head',
        'sudo', 'su', 'chroot', 'mount', 'umount', 'fdisk',
    ]);

    // Strict list of package manager flags that change target directories [npm Docs]
    const BANNED_FLAGS = new Set([
        '--prefix', '-g', '--global', // npm overrides [npm Docs]
        '--target', '-t', '--root',    // pip overrides
    ]);

    function spawnOnChildProcess(filePath) {
        let realFilePath;
        try {
            realFilePath = fs.realpathSync(path.resolve(filePath));
        } catch (error) {
            throw new Error(`File not found or invalid path: ${filePath}`);
        }

        if (!checkDirPathPermissions(realFilePath, "execute")) {
            throw new Error(`Denied Access Error: Execution of ${realFilePath} is not allowed.`);
        }

        // Keep it isolated from the main process context
        return fork(realFilePath, [], { env: { NODE_ENV: 'production' }, serialization: 'json' });
    }

    function getAppDataDirPath() {
        const platform = os.platform();
        if (platform === 'win32') return process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
        if (platform === 'linux') return process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config');
        if (platform === 'darwin') return path.join(os.homedir(), 'Library', 'Application Support');
        throw new Error(`Unsupported platform: ${platform}`);
    }

    function runSystemCommand(command, cwd) {
        return new Promise((resolve) => {
            try {
                // 1. Canonicalize the directory to defeat symlink path routing trickery
                const absoluteCwd = path.resolve(cwd);
                let realCwd;
                try {
                    realCwd = fs.realpathSync(absoluteCwd);
                } catch (error) {
                    return resolve({ statusOk: false, message: "Directory path invalid or missing." });
                }

                // 2. Validate userAllowedPaths permissions against the TRUE physical path
                if (!checkDirPathPermissions(realCwd, "execute")) {
                    return resolve({ statusOk: false, message: "Unauthorized directory execution path." });
                }

                // 3. Block Command Chaining entirely (forces the AI to execute single commands one by one)
                if (/[\;&\|\n\r]/.test(command)) {
                    return resolve({
                        statusOk: false,
                        message: "Security Filter Violation: Command chaining tokens (; && | or newlines) are prohibited."
                    });
                }

                // Tokenize command securely into structural array parts
                const parts = command.trim().split(/\s+/);
                const cmd = parts[0];
                let args = parts.slice(1);

                // 4. Block Dangerous System Binaries (Catches git here)
                if (BANNED_BINARIES.has(cmd)) {
                    return resolve({
                        statusOk: false,
                        message: `Security Filter Violation: Binary command '${cmd}' is explicitly banned.`
                    });
                }

                // 5. Automatic Flag Injection for Ecosystem Lifecycle Safety [npm Docs]
                if (cmd === 'npm' || cmd === 'yarn' || cmd === 'pnpm') {
                    const isInstall = args.some(arg => arg === 'install' || arg === 'i' || arg === 'add');
                    if (isInstall && !args.includes('--ignore-scripts')) {
                        args.push('--ignore-scripts'); // Stop package-level malware execution dead [npm Docs]
                    }
                } else if (cmd === 'pip' || cmd === 'pip3') {
                    const isInstall = args.some(arg => arg === 'install');
                    if (isInstall && !args.includes('--no-scripts')) {
                        args.push('--no-scripts'); // Python variant lifecycle script isolation
                    }
                }

                // 6. Block Path Traversals and System Override Flags
                for (const arg of args) {
                    if (BANNED_FLAGS.has(arg)) {
                        return resolve({
                            statusOk: false,
                            message: `Security Filter Violation: Directory override flag '${arg}' is prohibited. All actions must remain local.`
                        });
                    }

                    // Strict Out-of-Bounds evaluation (Blocks basic absolute parameters and path hops)
                    if (arg.includes('..') || arg.startsWith('/') || /^[A-Z]:\\/i.test(arg)) {
                        return resolve({
                            statusOk: false,
                            message: `Security Filter Violation: Out-of-bounds path target detected in arguments: '${arg}'`
                        });
                    }
                }

                // 7. Secure Local Execution Routing
                const platform = os.platform();
                const isWindows = platform === 'win32';
                const binaryPath = isWindows ? 'cmd.exe' : `/usr/bin/${cmd}`;
                const spawnArgs = isWindows ? ['/c', command] : args;

                execFile(
                    binaryPath,
                    spawnArgs,
                    { 
                        cwd: realCwd, 
                        timeout: 90000,              // 1.5 minute cutoff threshold allocation
                        maxBuffer: 5 * 1024 * 1024,  // 5MB data streaming allocation
                        env: {
                            // Provide lookups only. This hides database tokens, cloud keys, and app secrets completely.
                            PATH: platform === 'win32' 
                                ? 'C:\\Windows\\system32;C:\\Windows' 
                                : '/usr/bin:/bin:/usr/local/bin'
                        }
                    },
                    (error, stdout, stderr) => {
                        if (error) {
                            resolve({ statusOk: false, message: `Command returned an error state.`, stderr: stderr || error.message });
                        } else {
                            resolve({ statusOk: true, message: "Execution finished successfully within workspace boundaries.", stdout, stderr });
                        }
                    }
                );
            } catch (err) {
                resolve({ statusOk: false, message: `Internal code validation crash: ${err.message}` });
            }
        });
    }

    return {
        spawnOnChildProcess, 
        getAppDataDirPath, 
        runSystemCommand
    };
}
