import getUtilities from '../index.js';
import TestRunner from './test-runner.js';
import * as path from 'path';
import * as fs from 'fs';

const runner = new TestRunner();

// Configuration
const TEST_BASE_DIR = "E:/apps/npm-packages/mnm-node-utilities/test/sample-directory";
const TEST_PERMISSIONS = [{ path: TEST_BASE_DIR, permissions: "rwdx" }];

// Ensure test base directory exists and is clean for this suite
if (fs.existsSync(path.dirname(TEST_BASE_DIR))) {
    fs.rmSync(path.dirname(TEST_BASE_DIR), { recursive: true, force: true });
}
fs.mkdirSync(path.dirname(TEST_BASE_DIR), { recursive: true });

const utils = getUtilities({ userAllowedPaths: TEST_PERMISSIONS });

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

// Helper to create a unique test subdirectory to avoid conflicts
const getTestDir = (name) => path.join(TEST_BASE_DIR, name);

runner.describe('File System Utils', () => {

    // --- Permission Helpers ---
    runner.it('getUserAllowedPaths: returns array of permissions', () => {
        const paths = getUserAllowedPaths();
        assertTrue(Array.isArray(paths));
        assertTrue(paths.length > 0);
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
        assertFalse(fileExists(path.join(TEST_BASE_DIR, "nonexistent.txt")));
    });

    runner.it('isDirectory: returns true for dir', () => {
        assertTrue(isDirectory(TEST_BASE_DIR));
    });

    runner.it('isFile: returns true for file', async () => {
        const f = path.join(TEST_BASE_DIR, "test.txt");
        writeFileSync(f, "content");
        assertTrue(isFile(f));
        deleteFileSync(f);
    });

    runner.it('getFileExt: extracts extension', () => {
        assertEqual(getFileExt("file.txt"), ".txt");
    });

    runner.it('getParentDir: extracts parent dir', () => {
        assertEqual(getParentDir("/path/to/file.txt"), "/path/to");
    });

    // --- Read/Write/Sync Methods ---
    runner.it('mkdirSync: creates directory', async () => {
        const d = getTestDir("mkdirSync-test");
        const res = mkdirSync(d);
        assertEqual(res.status, "success");
        assertTrue(isDirectory(d));
        deleteDirSync(d);
    });

    runner.it('mkdir: creates directory async', async () => {
        const d = getTestDir("mkdir-async-test");
        const res = await mkdir(d);
        assertEqual(res.status, "success");
        assertTrue(isDirectory(d));
        deleteDirSync(d);
    });

    runner.it('writeFileSync: writes content', async () => {
        const f = getTestDir("writeSync.txt");
        const res = writeFileSync(f, "Hello Sync");
        assertEqual(res.status, "success");
        const content = readFileSync(f).data;
        assertEqual(content, "Hello Sync");
        deleteFileSync(f);
    });

    runner.it('writeFile: writes content async', async () => {
        const f = getTestDir("writeAsync.txt");
        const res = await writeFile(f, "Hello Async");
        assertEqual(res.status, "success");
        const content = await readFile(f).data;
        assertEqual(content, "Hello Async");
        deleteFileSync(f);
    });

    runner.it('readFileSync: reads content', async () => {
        const f = getTestDir("readSync.txt");
        writeFileSync(f, "Read Me");
        const res = readFileSync(f);
        assertEqual(res.status, "success");
        assertEqual(res.data, "Read Me");
        deleteFileSync(f);
    });

    runner.it('readFile: reads content async', async () => {
        const f = getTestDir("readAsync.txt");
        writeFileSync(f, "Read Me Async");
        const res = await readFile(f);
        assertEqual(res.status, "success");
        assertEqual(res.data, "Read Me Async");
        deleteFileSync(f);
    });

    runner.it('deleteFileSync: deletes file', async () => {
        const f = getTestDir("deleteSync.txt");
        writeFileSync(f, "Delete Me");
        const res = deleteFileSync(f);
        assertEqual(res.status, "success");
        assertFalse(fileExists(f));
    });

    runner.it('deleteFile: deletes file async', async () => {
        const f = getTestDir("deleteAsync.txt");
        writeFileSync(f, "Delete Me Async");
        const res = await deleteFile(f);
        assertEqual(res.status, "successful");
        assertFalse(fileExists(f));
    });

    runner.it('deleteDirSync: deletes directory', async () => {
        const d = getTestDir("deleteDirSync");
        mkdirSync(d);
        const res = deleteDirSync(d);
        assertEqual(res.status, "success");
        assertFalse(isDirectory(d));
    });

    runner.it('deleteDir: deletes directory async', async () => {
        const d = getTestDir("deleteDirAsync");
        mkdirSync(d);
        const res = await deleteDir(d);
        assertEqual(res.status, "success");
        assertFalse(isDirectory(d));
    });

    runner.it('getFileSize: returns size in bytes', async () => {
        const f = getTestDir("size.txt");
        writeFileSync(f, "12345"); // 5 bytes
        const size = await getFileSize(f);
        assertEqual(size, 5);
        deleteFileSync(f);
    });

    // --- Read Directory Sync/Async ---
    runner.it('readdirSync: lists files', async () => {
        const d = getTestDir("readdirSync");
        mkdirSync(d);
        writeFile(path.join(d, "a.txt"), "");
        writeFile(path.join(d, "b.txt"), "");
        
        const res = readdirSync(d);
        assertEqual(res.status, "success");
        assertTrue(res.data.length >= 2);
        
        deleteDirSync(d);
    });

    runner.it('readdir: lists files async', async () => {
        const d = getTestDir("readdirAsync");
        mkdirSync(d);
        writeFile(path.join(d, "a.txt"), "");
        
        const res = await readdir(d);
        assertEqual(res.status, "success");
        assertTrue(res.data.length >= 1);
        
        deleteDirSync(d);
    });

    // --- Empty Checks ---
    runner.it('isFileEmptySync: returns true for empty', async () => {
        const f = getTestDir("emptySync.txt");
        writeFileSync(f, "");
        assertTrue(isFileEmptySync(f));
        deleteFileSync(f);
    });

    runner.it('isFileEmpty: returns true for empty async', async () => {
        const f = getTestDir("emptyAsync.txt");
        writeFileSync(f, "");
        const empty = await isFileEmpty(f);
        assertTrue(empty);
        deleteFileSync(f);
    });

    runner.it('isDirectoryEmptySync: returns true for empty', async () => {
        const d = getTestDir("emptyDirSync");
        mkdirSync(d);
        assertTrue(isDirectoryEmptySync(d));
        deleteDirSync(d);
    });

    runner.it('isDirectoryEmpty: returns true for empty async', async () => {
        const d = getTestDir("emptyDirAsync");
        mkdirSync(d);
        const empty = await isDirectoryEmpty(d);
        assertTrue(empty);
        deleteDirSync(d);
    });

    // --- List Files/Dirs ---
    runner.it('getAllFilesFromDirectorySync: filters by ext', async () => {
        const d = getTestDir("listSync");
        mkdirSync(d);
        writeFile(path.join(d, "a.txt"), "");
        writeFile(path.join(d, "b.json"), "");
        
        const files = getAllFilesFromDirectorySync(d, ".txt");
        assertTrue(Array.isArray(files));
        assertEqual(files.length, 1);
        assertEqual(files[0], "a.txt");
        
        deleteDirSync(d);
    });

    runner.it('getAllFilesFromDirectory: filters by ext async', async () => {
        const d = getTestDir("listAsync");
        mkdirSync(d);
        writeFile(path.join(d, "a.txt"), "");
        writeFile(path.join(d, "b.json"), "");
        
        const files = await getAllFilesFromDirectory(d, ".txt");
        assertTrue(Array.isArray(files));
        assertEqual(files.length, 1);
        
        deleteDirSync(d);
    });

    runner.it('getAllDirsFromDirectorySync: lists subdirs', async () => {
        const d = getTestDir("dirsSync");
        mkdirSync(d);
        mkdirSync(path.join(d, "subdir1"));
        writeFile(path.join(d, "file.txt"), "");
        
        const dirs = getAllDirsFromDirectorySync(d);
        assertTrue(Array.isArray(dirs));
        assertEqual(dirs.length, 1);
        assertEqual(dirs[0], "subdir1");
        
        deleteDirSync(d);
    });

    runner.it('getAllDirsFromDirectory: lists subdirs async', async () => {
        const d = getTestDir("dirsAsync");
        mkdirSync(d);
        mkdirSync(path.join(d, "subdir2"));
        
        const dirs = await getAllDirsFromDirectory(d);
        assertTrue(Array.isArray(dirs));
        assertEqual(dirs.length, 1);
        
        deleteDirSync(d);
    });

    // --- Recursive Operations ---
    runner.it('getAllFilesRecursivelySync: gets all files', async () => {
        const d = getTestDir("recSync");
        mkdirSync(path.join(d, "sub"));
        writeFile(path.join(d, "top.txt"), "");
        writeFile(path.join(d, "sub", "nested.txt"), "");
        
        const files = getAllFilesRecursivelySync(d);
        assertTrue(Array.isArray(files));
        // Should have at least 2 files
        assertTrue(files.length >= 2);
        
        deleteDirSync(d);
    });

    runner.it('getAllFilesRecursively: gets all files async', async () => {
        const d = getTestDir("recAsync");
        mkdirSync(path.join(d, "sub"));
        writeFile(path.join(d, "top.txt"), "");
        writeFile(path.join(d, "sub", "nested.txt"), "");
        
        const files = await getAllFilesRecursively(d);
        assertTrue(Array.isArray(files));
        assertTrue(files.length >= 2);
        
        deleteDirSync(d);
    });

    // --- Bulk Deletion ---
    runner.it('deleteAllFilesInDirPath: deletes files only', async () => {
        const d = getTestDir("delFiles");
        mkdirSync(d);
        writeFile(path.join(d, "a.txt"), "");
        writeFile(path.join(d, "b.txt"), "");
        
        const res = await deleteAllFilesInDirPath(d);
        assertEqual(res.status, "success");
        assertTrue(isDirectoryEmptySync(d)); // Dir should still exist but be empty
        deleteDirSync(d);
    });

    runner.it('deleteAllDirsInDirPath: deletes subdirs', async () => {
        const d = getTestDir("delDirs");
        mkdirSync(d);
        mkdirSync(path.join(d, "sub1"));
        mkdirSync(path.join(d, "sub2"));
        
        const res = await deleteAllDirsInDirPath(d);
        assertEqual(res.status, "success");
        // Check if subdirs are gone
        assertFalse(isDirectory(path.join(d, "sub1")));
        
        deleteDirSync(d);
    });

    runner.it('deleteAllInDirPath: deletes everything', async () => {
        const d = getTestDir("delAll");
        mkdirSync(d);
        writeFile(path.join(d, "a.txt"), "");
        mkdirSync(path.join(d, "sub"));
        
        const res = await deleteAllInDirPath(d);
        // Note: deleteAllInDirPath tries to delete files and dirs.
        // If successful, the directory content is empty.
        assertTrue(isDirectoryEmptySync(d));
        
        deleteDirSync(d);
    });

    runner.it('deleteAllEmptyFilesInDirectory: deletes empty files', async () => {
        const d = getTestDir("delEmptyFiles");
        mkdirSync(d);
        writeFile(path.join(d, "empty.txt"), "");
        writeFile(path.join(d, "nonempty.txt"), "data");
        
        const res = await deleteAllEmptyFilesInDirectory(d);
        assertEqual(res.status, "success");
        assertTrue(fileExists(path.join(d, "nonempty.txt")));
        assertFalse(fileExists(path.join(d, "empty.txt")));
        
        deleteDirSync(d);
    });

    runner.it('deleteAllEmptyDirsInDirectory: deletes empty dirs', async () => {
        const d = getTestDir("delEmptyDirs");
        mkdirSync(d);
        mkdirSync(path.join(d, "emptySub"));
        writeFile(path.join(d, "file.txt"), "");
        
        const res = await deleteAllEmptyDirsInDirectory(d);
        assertEqual(res.status, "success");
        assertFalse(isDirectory(path.join(d, "emptySub")));
        
        deleteDirSync(d);
    });

    // --- MIME Types & Helpers ---
    runner.it('getMimeType: returns correct mime', () => {
        assertEqual(getMimeType("file.png"), "image/png");
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
        const d = getTestDir("createDirPath");
        const res = await createDirPath(d);
        assertEqual(res, d);
        assertTrue(isDirectory(d));
        deleteDirSync(d);
    });

    runner.it('createSvgFile: creates svg file', async () => {
        const d = getTestDir("createSvg");
        mkdirSync(d);
        const svgData = "<svg></svg>";
        const res = await createSvgFile(d, "test", svgData);
        assertEqual(res.imageName, "test.svg");
        assertTrue(fileExists(path.join(d, "test.svg")));
        
        deleteDirSync(d);
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
