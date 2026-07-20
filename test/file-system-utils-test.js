import getUtilities from '../index.js';
import TestRunner from './test-runner.js';
import * as path from 'path';
import * as fs from 'fs';

const runner = new TestRunner();
const dirname = import.meta.dirname;
// Configuration
const TEST_BASE_DIR = path.join(dirname, "sample-directory").replace(/\\/g, "/");

// Ensure base directory exists before starting tests
if (!fs.existsSync(TEST_BASE_DIR)) {
    fs.mkdirSync(TEST_BASE_DIR, { recursive: true });
}

const config = { 
    userAllowedPaths: [
        { 
            path: TEST_BASE_DIR, 
            permissions: "" 
        }
    ],
    securedFsCommands : false,
};

const utils = getUtilities(config);

// Destructure all returned methods
const {
    getUserAllowedPathsByPermissionType,
    getUserAllowedPaths,
    getUserFsPermission,
    checkDirPathPermissions,
    mimeTypes,
    baseName,
    fileExists,
    isFile,
    isDirectory,
    getFileExt,
    getParentDir,
    readdir,
    readdirSync,
    mkdir,
    mkdirSync,
    deleteDir,
    deleteDirSync,
    readFile,
    readFileSync,
    writeFile,
    writeFileSync,
    deleteFile,
    deleteFileSync,
    getFileSize,
    isFileEmpty,
    isFileEmptySync,
    isDirectoryEmpty,
    isDirectoryEmptySync,
    getAllFilesFromDirectory,
    getAllFilesFromDirectorySync,
    getAllDirsFromDirectory,
    getAllDirsFromDirectorySync,
    getAllFilesRecursively,
    getAllFilesRecursivelySync,
    deleteAllFilesInDirPath,
    deleteAllDirsInDirPath,
    deleteAllInDirPath,
    deleteAllEmptyFilesInDirectory,
    deleteAllEmptyDirsInDirectory,
    getMimeType,
    getFileExtensionsByMimeType,
    getSpecifiedExt,
    createDirPath,
    createSvgFile
} = utils;

// Helper to create a unique test subdirectory
const getTestDir = (name) => path.join(TEST_BASE_DIR, `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${name}`);

// Helper to clean up a specific directory
const cleanupDir = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        try {
            deleteDirSync(dirPath);
        } catch (e) {
            // Ignore cleanup errors in tests if dir is already gone or locked
        }
    }
};

runner.describe('File System Utils', () => {

    // --- Permission Helpers ---
    runner.it('getUserAllowedPaths: returns array of permissions', () => {
        const paths = getUserAllowedPaths();

        assertTrue(Array.isArray(paths));
        assertTrue(paths.length > 0);
        // Verify the base dir is in the list
        assertTrue(paths.some(p => p.path === TEST_BASE_DIR || p.path === path.resolve(TEST_BASE_DIR)));
    });

    runner.it('getUserAllowedPathsByPermissionType: filters by read', () => {
        const paths = getUserAllowedPathsByPermissionType("read");
        assertTrue(Array.isArray(paths));
        assertTrue(paths.length > 0);
    });

    runner.it('getUserFsPermission: finds permission for test dir', () => {
        const perm = getUserFsPermission(TEST_BASE_DIR);
        assertTrue(perm !== undefined);
        assertEqual(perm.read, true);
    });

    runner.it('checkDirPathPermissions: checks read access', () => {
        assertTrue(checkDirPathPermissions(TEST_BASE_DIR, "read"));
        assertTrue(checkDirPathPermissions(TEST_BASE_DIR, "write"));
        assertTrue(checkDirPathPermissions(TEST_BASE_DIR, "delete"));
        assertTrue(checkDirPathPermissions(TEST_BASE_DIR, "execute"));
    });

    // --- Basic File/Dir Info ---
    runner.it('baseName: extracts filename', () => {
        assertEqual(baseName("/path/to/file.txt"), "file.txt");
        assertEqual(baseName("/path/to/file.txt", ".txt"), "file");
    });

    runner.it('fileExists: returns true for existing dir', () => {
        assertTrue(fileExists(TEST_BASE_DIR));
    });

    runner.it('fileExists: returns false for non-existing file', () => {
        const nonExistent = path.join(TEST_BASE_DIR, "nonexistent_file_12345.txt");
        assertFalse(fileExists(nonExistent));
    });

    runner.it('isDirectory: returns true for dir', () => {
        isDirectory(TEST_BASE_DIR);
        assertTrue(isDirectory(TEST_BASE_DIR));
    });

    runner.it('isFile: returns true for file', async () => {
        const testDir = getTestDir("isFile");
        mkdirSync(testDir);
        const f = path.join(testDir, "test.txt");
        writeFileSync(f, "content");
        assertTrue(isFile(f));
        cleanupDir(testDir);
    });

    runner.it('isFile: returns false for directory', async () => {
        const testDir = getTestDir("isFileDir");
        mkdirSync(testDir);
        assertFalse(isFile(testDir));
        cleanupDir(testDir);
    });

    runner.it('getFileExt: extracts extension', () => {
        assertEqual(getFileExt("file.txt"), ".txt");
        assertEqual(getFileExt("file.tar.gz"), ".gz");
    });

    runner.it('getParentDir: extracts parent dir', async () => {

        const testDir = getTestDir("getParentDir");
        mkdirSync(testDir);
        await writeFile(path.join(testDir, "a.txt"), "");

        assertEqual(getParentDir(path.dirname(path.resolve(TEST_BASE_DIR))), null);
        assertEqual(getParentDir(path.join(testDir, "a.txt")), testDir);

        cleanupDir(testDir);
    });

    // --- Read/Write/Sync Methods ---
    runner.it('mkdirSync: creates directory', () => {
        const testDir = getTestDir("mkdirSync");
        const res = mkdirSync(testDir);
        assertEqual(res.status, "success");
        assertTrue(isDirectory(testDir));
        cleanupDir(testDir);
    });

    runner.it('mkdir: creates directory async', async () => {
        const testDir = getTestDir("mkdirAsync");
        const res = await mkdir(testDir);
        assertEqual(res.status, "success");
        assertTrue(isDirectory(testDir));
        cleanupDir(testDir);
    });

    runner.it('writeFileSync: writes content', () => {
        const testDir = getTestDir("writeSync");
        mkdirSync(testDir);
        const f = path.join(testDir, "file.txt");
        const res = writeFileSync(f, "Hello Sync");
        assertEqual(res.status, "success");
        const content = readFileSync(f).data;
        assertEqual(content, "Hello Sync");
        cleanupDir(testDir);
    });

    runner.it('writeFile: writes content async', async () => {
        const testDir = getTestDir("writeFile");
        mkdirSync(testDir);
        const f = path.join(testDir, "file.txt");
        const res = await writeFile(f, "Hello Async");        
        const content = await readFile(f);
        assertEqual(res.status, "success");
        assertEqual(content.data, "Hello Async");
        cleanupDir(testDir);
    });

    runner.it('readFileSync: reads content', () => {
        const testDir = getTestDir("readSync");
        mkdirSync(testDir);
        const f = path.join(testDir, "file.txt");
        writeFileSync(f, "Read Me");
        const res = readFileSync(f);
        assertEqual(res.status, "success");
        assertEqual(res.data, "Read Me");
        cleanupDir(testDir);
    });

    runner.it('readFile: reads content async', async () => {
        const testDir = getTestDir("readAsync");
        mkdirSync(testDir);
        const f = path.join(testDir, "file.txt");
        writeFileSync(f, "Read Me Async");
        const res = await readFile(f);
        assertEqual(res.status, "success");
        assertEqual(res.data, "Read Me Async");
        cleanupDir(testDir);
    });

    runner.it('deleteFileSync: deletes file', () => {
        const testDir = getTestDir("deleteFileSync");
        mkdirSync(testDir);
        const f = path.join(testDir, "file.txt");
        writeFileSync(f, "Delete Me");
        const res = deleteFileSync(f);
        assertEqual(res.status, "success");
        assertFalse(fileExists(f));
        cleanupDir(testDir);
    });

    runner.it('deleteFile: deletes file async', async () => {
        const testDir = getTestDir("deleteFileAsync");
        mkdirSync(testDir);
        const f = path.join(testDir, "file.txt");
        writeFileSync(f, "Delete Me Async");
        const res = await deleteFile(f);
        assertEqual(res.status, "successful");
        assertFalse(fileExists(f));
        cleanupDir(testDir);
    });

    runner.it('deleteDirSync: deletes directory', () => {
        const testDir = getTestDir("deleteDirSync");
        mkdirSync(testDir);
        const res = deleteDirSync(testDir, {recursive : true});
        assertEqual(res.status, "success");
        assertFalse(isDirectory(testDir));
    });

    runner.it('deleteDir: deletes directory async', async () => {
        const testDir = getTestDir("deleteDirAsync");
        mkdirSync(testDir);
        const res = await deleteDir(testDir, {recursive : true});
        assertEqual(res.status, "success");
        assertFalse(isDirectory(testDir));
    });

    runner.it('getFileSize: returns size in bytes', async () => {
        const testDir = getTestDir("getFileSize");
        mkdirSync(testDir);
        const f = path.join(testDir, "size.txt");
        writeFileSync(f, "12345"); // 5 bytes
        const size = await getFileSize(f);
        assertEqual(size, 5);
        cleanupDir(testDir);
    });

    // --- Read Directory Sync/Async ---
    runner.it('readdirSync: lists files', async () => {
        const testDir = getTestDir("readdirSync");
        mkdirSync(testDir);
        await writeFile(path.join(testDir, "a.txt"), "");
        await writeFile(path.join(testDir, "b.txt"), "");
        
        const res = readdirSync(testDir);
        assertEqual(res.status, "success");
        assertTrue(Array.isArray(res.data));
        assertTrue(res.data.length >= 2);
        
        cleanupDir(testDir);
    });

    runner.it('readdir: lists files async', async () => {
        const testDir = getTestDir("readdirAsync");
        mkdirSync(testDir);
        await writeFile(path.join(testDir, "a.txt"), "");
        
        const res = await readdir(testDir);
        assertEqual(res.status, "success");
        assertTrue(Array.isArray(res.data));
        assertTrue(res.data.length >= 1);
        
        cleanupDir(testDir);
    });

    // --- Empty Checks ---
    runner.it('isFileEmptySync: returns true for empty', async () => {
        const testDir = getTestDir("isFileEmptySync");
        mkdirSync(testDir);
        const f = path.join(testDir, "empty.txt");
        writeFileSync(f, "");
        assertTrue(isFileEmptySync(f));
        cleanupDir(testDir);
    });

    runner.it('isFileEmptySync: returns false for non-empty', async () => {
        const testDir = getTestDir("isFileEmptySyncNonEmpty");
        mkdirSync(testDir);
        const f = path.join(testDir, "nonempty.txt");
        writeFileSync(f, "data");
        assertFalse(isFileEmptySync(f));
        cleanupDir(testDir);
    });

    runner.it('isFileEmpty: returns true for empty async', async () => {
        const testDir = getTestDir("isFileEmptyAsync");
        mkdirSync(testDir);
        const f = path.join(testDir, "empty.txt");
        writeFileSync(f, "");
        const empty = await isFileEmpty(f);
        assertTrue(empty);
        cleanupDir(testDir);
    });

    runner.it('isDirectoryEmpty: returns true for empty', () => {
        const testDir = getTestDir("isDirEmptySync");
        mkdirSync(testDir);
        const result = isDirectoryEmptySync(testDir);
        assertTrue(result);
        cleanupDir(testDir);
    });

    runner.it('isDirectoryEmptySync: returns false for non-empty', async () => {
        const testDir = getTestDir("isDirEmptySyncNonEmpty");
        mkdirSync(testDir);
        await writeFile(path.join(testDir, "file.txt"), "");
        const result = isDirectoryEmptySync(testDir);
        assertFalse(result);
        cleanupDir(testDir);
    });

    runner.it('isDirectoryEmpty: returns true for empty async', async () => {
        const testDir = getTestDir("isDirEmptyAsync");
        mkdirSync(testDir);
        const empty = await isDirectoryEmpty(testDir);
        assertTrue(empty);
        cleanupDir(testDir);
    });

    // --- List Files/Dirs ---
    runner.it('getAllFilesFromDirectorySync: filters by ext', async () => {
        const testDir = getTestDir("listSync");
        mkdirSync(testDir);
        await writeFile(path.join(testDir, "a.txt"), "");
        await writeFile(path.join(testDir, "b.json"), "");
        
        const files = getAllFilesFromDirectorySync(testDir, ".txt");
        assertTrue(Array.isArray(files));
        assertEqual(files.length, 1);
        assertEqual(files[0], "a.txt");
        
        cleanupDir(testDir);
    });

    runner.it('getAllFilesFromDirectory: filters by ext async', async () => {
        const testDir = getTestDir("listAsync");
        mkdirSync(testDir);
        await writeFile(path.join(testDir, "a.txt"), "");
        await writeFile(path.join(testDir, "b.json"), "");
        
        const files = await getAllFilesFromDirectory(testDir, ".txt");
        assertTrue(Array.isArray(files));
        assertEqual(files.length, 1);
        
        cleanupDir(testDir);
    });

    runner.it('getAllDirsFromDirectorySync: lists subdirs', async () => {
        const testDir = getTestDir("dirsSync");
        mkdirSync(testDir);
        mkdirSync(path.join(testDir, "subdir1"));
        await writeFile(path.join(testDir, "file.txt"), "");
        
        const dirs = getAllDirsFromDirectorySync(testDir);
        assertTrue(Array.isArray(dirs));
        assertEqual(dirs.length, 1);
        assertEqual(dirs[0], "subdir1");
        
        cleanupDir(testDir);
    });

    runner.it('getAllDirsFromDirectory: lists subdirs async', async () => {
        const testDir = getTestDir("dirsAsync");
        mkdirSync(testDir);
        mkdirSync(path.join(testDir, "subdir2"));
        
        const dirs = await getAllDirsFromDirectory(testDir);
        assertTrue(Array.isArray(dirs));
        assertEqual(dirs.length, 1);
        
        cleanupDir(testDir);
    });

    // --- Recursive Operations ---
    runner.it('getAllFilesRecursivelySync: gets all files', async () => {
        const testDir = getTestDir("recSync");
        mkdirSync(path.join(testDir, "sub"));
        await writeFile(path.join(testDir, "top.txt"), "");
        await writeFile(path.join(testDir, "sub", "nested.txt"), "");
        
        const files = getAllFilesRecursivelySync(testDir);
        assertTrue(Array.isArray(files));
        // Should find both files
        assertTrue(files.length >= 2);
        
        cleanupDir(testDir);
    });

    runner.it('getAllFilesRecursively: gets all files async', async () => {
        const testDir = getTestDir("recAsync");
        mkdirSync(path.join(testDir, "sub"));
        await writeFile(path.join(testDir, "top.txt"), "");
        await writeFile(path.join(testDir, "sub", "nested.txt"), "");
        
        const files = await getAllFilesRecursively(testDir);
        assertTrue(Array.isArray(files));
        assertTrue(files.length >= 2);
        
        cleanupDir(testDir);
    });

    // --- Bulk Deletion ---
    runner.it('deleteAllFilesInDirPath: deletes files only', async () => {
        const testDir = getTestDir("delFiles");
        mkdirSync(testDir);
        await writeFile(path.join(testDir, "a.txt"), "");
        await writeFile(path.join(testDir, "b.txt"), "");
        
        const res = await deleteAllFilesInDirPath(testDir);
        assertEqual(res.status, "success");
        // Dir should still exist but be empty
        assertTrue(isDirectory(testDir));
        assertTrue(isDirectoryEmptySync(testDir));
        
        cleanupDir(testDir);
    });

    runner.it('deleteAllDirsInDirPath: deletes subdirs', async () => {
        const testDir = getTestDir("delDirs");
        mkdirSync(testDir);
        mkdirSync(path.join(testDir, "sub1"));
        mkdirSync(path.join(testDir, "sub2"));
        await writeFile(path.join(testDir, "file.txt"), ""); // Keep a file
        
        const res = await deleteAllDirsInDirPath(testDir);
        assertEqual(res.status, "success");
        // Check if subdirs are gone
        assertFalse(isDirectory(path.join(testDir, "sub1")));
        assertFalse(isDirectory(path.join(testDir, "sub2")));
        // File should remain
        assertTrue(fileExists(path.join(testDir, "file.txt")));
        
        cleanupDir(testDir);
    });

    runner.it('deleteAllInDirPath: deletes everything', async () => {
        const testDir = getTestDir("delAll");
        mkdirSync(testDir);
        await writeFile(path.join(testDir, "a.txt"), "");
        mkdirSync(path.join(testDir, "sub"));
        
        const res = await deleteAllInDirPath(testDir);
        // Note: deleteAllInDirPath deletes files and dirs inside, but usually not the root dir itself unless specified.
        // However, our implementation deletes content. Let's verify content is empty.
        assertTrue(isDirectory(testDir));
        assertTrue(isDirectoryEmptySync(testDir));
        
        cleanupDir(testDir);
    });

    runner.it('deleteAllEmptyFilesInDirectory: deletes empty files', async () => {
        const testDir = getTestDir("delEmptyFiles");
        mkdirSync(testDir);
        await writeFile(path.join(testDir, "empty.txt"), "");
        await writeFile(path.join(testDir, "nonempty.txt"), "data");
        
        const res = await deleteAllEmptyFilesInDirectory(testDir);
        assertEqual(res.status, "success");
        assertTrue(fileExists(path.join(testDir, "nonempty.txt")));
        assertFalse(fileExists(path.join(testDir, "empty.txt")));
        
        cleanupDir(testDir);
    });

    runner.it('deleteAllEmptyDirsInDirectory: deletes empty dirs', async () => {
        const testDir = getTestDir("delEmptyDirs");
        mkdirSync(testDir);
        mkdirSync(path.join(testDir, "emptySub"));
        await writeFile(path.join(testDir, "file.txt"), "");
        
        const res = await deleteAllEmptyDirsInDirectory(testDir);
        assertEqual(res.status, "success");
        assertFalse(isDirectory(path.join(testDir, "emptySub")));
        
        cleanupDir(testDir);
    });

    // --- MIME Types & Helpers ---
    runner.it('getMimeType: returns correct mime', async() => {

        const testDir = getTestDir("getMimeType");
        mkdirSync(testDir);

        let textFile = path.join(testDir, "file.txt"),
            pngFile = path.join(testDir, "file.png");
        
        await writeFile(textFile, "");
        await writeFile(pngFile, "");

        assertEqual(getMimeType("file.png"), "image/png");
        assertEqual(getMimeType("file.txt"), "text/plain");
        assertEqual(getMimeType(textFile), "text/plain");
        assertEqual(getMimeType(pngFile), "image/png");

        cleanupDir(testDir);
    });

    runner.it('getMimeType: returns undefined for directory', () => {
        const testDir = getTestDir("mimeTypeDir");
        mkdirSync(testDir);
        assertTrue(getMimeType(testDir) === undefined);
        cleanupDir(testDir);
    });

    runner.it('getFileExtensionsByMimeType: returns array of exts', () => {
        const exts = getFileExtensionsByMimeType("image/png");
        assertTrue(Array.isArray(exts));
        assertTrue(exts.includes("png"));
    });

    runner.it('getSpecifiedExt: finds first matching ext', () => {
        assertEqual(getSpecifiedExt("file.data.txt", ["txt", "json"]), "txt");
    });

    runner.it('createDirPath: creates dir if not exists', async () => {
        const testDir = getTestDir("createDirPath");
        const res = await createDirPath(testDir);
        assertEqual(res, testDir);
        assertTrue(isDirectory(testDir));
        cleanupDir(testDir);
    });

    runner.it('createSvgFile: creates svg file', async () => {
        const testDir = getTestDir("createSvg");
        mkdirSync(testDir);
        const svgData = "<svg></svg>";
        const res = await createSvgFile(testDir, "test", svgData);
        assertEqual(res.imageName, "test.svg");
        assertTrue(fileExists(path.join(testDir, "test.svg")));
        
        cleanupDir(testDir);
    });
});

// Helper assertions
function assertEqual(actual, expected, msg = "") {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${msg ? msg + ": " : ""}Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
    }
}
function assertTrue(val, msg = "") {
    if (!val) throw new Error(`${msg ? msg + ": " : ""}Expected truthy value but got ${val}`);
}
function assertFalse(val, msg = "") {
    if (val) throw new Error(`${msg ? msg + ": " : ""}Expected falsy value but got ${val}`);
}

runner.end();
