import { execSync } from 'child_process';
import os from "os";
import path from "path";
import fs from "fs";

export default function getSafeWritablePaths() {
    const platform = os.platform();
    const homeDir = os.homedir();
    let safePaths = [],
        appData;

    // 1. ALWAYS INCLUDE USER SPACE (Documents, Desktop, etc. are always safe)
    safePaths.push({
        type: "User Home",
        path: homeDir
    });

    // 2. Include App Data Path
    switch (platform) {
        case 'win32':
            // Windows AppData (Roaming)
            appData = process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming'); [1];
            break;

        case 'darwin':
            // macOS Application Support
            appData = path.join(homeDir, 'Library', 'Application Support');
            break;
        case 'linux':
            // Linux XDG Config Home
            appData = process.env.XDG_CONFIG_HOME || path.join(homeDir, '.config');
            break;
        default:
            // Fallback for other Unix-like systems
            appData = process.env.XDG_CONFIG_HOME || path.join(homeDir, '.config');
            break;
    }
    safePaths.push({type : "App Data Path", path : appData});


    try {
        // 3. WINDOWS: Get secondary drives (D:\, E:\), skip the OS partition (C:\)
        if (platform === 'win32') {
            const stdout = execSync('powershell -NoProfile -Command "Get-CimInstance Win32_LogicalDisk | Select-Object -ExpandProperty DeviceID"', { encoding: 'utf8' });
            const drives = stdout.split(/\r?\n/).map(d => d.trim()).filter(d => /^[A-Za-z]:$/.test(d));
            const winRoot = (process.env.SystemRoot || 'C:\\Windows').toLowerCase();
            const osDriveLetter = path.parse(winRoot).root.toLowerCase().substring(0, 2);

            drives.forEach(drive => {
                if (drive.toLowerCase() !== osDriveLetter) {
                    safePaths.push({ type: "Secondary Drive", path: `${drive}${path.sep}` });
                }
            });
        } 
        // 4. MACOS: Get external drives/USB devices mounted under /Volumes
        else if (platform === 'darwin') {
            const volumesDir = '/Volumes';
            if (fs.existsSync(volumesDir)) {
                fs.readdirSync(volumesDir).forEach(item => {
                    const fullPath = path.join(volumesDir, item);
                    if (item !== 'Macintosh HD') {
                        safePaths.push({ type: "External Volume", path: fullPath });
                    }
                });
            }
        } 
        // 5. LINUX: Get USBs/Hard drives mounted under /media/username or /mnt
        else if (platform === 'linux') {
            const username = os.userInfo().username;
            const mediaPaths = [`/media/${username}`, '/mnt'];

            mediaPaths.forEach(dir => {
                if (fs.existsSync(dir)) {
                    fs.readdirSync(dir).forEach(item => {
                        safePaths.push({ type: "Mounted Storage", path: path.join(dir, item) });
                    });
                }
            });
        }
    } catch (error) {
        // Fail silently if terminal commands fail; fall back to User Home
    }

    // 6. THE ACTIVE FILTER: Keep only paths that pass a real-time write test
    return safePaths.filter(item => {
        try {
            const testFile = path.join(item.path, `.write_test_${Math.random().toString(36).substring(2)}`);
            fs.writeFileSync(testFile, 'test');
            fs.unlinkSync(testFile);
            return true;
        } catch(err) {
            return false; // OS blocked access; drop this path
        }
    });
}
