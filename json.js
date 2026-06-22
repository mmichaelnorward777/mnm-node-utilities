import * as path from "path";
import { writeFileSync, fileExists, writeFile, readFile, mkdirSync } from "./file-system.js";

export function parseValidatedJSON(inputValue) {

    try {

        return JSON.parse(inputValue);

    } catch (err) {

        return inputValue;

    }

}

export function createJsonFileObject(targetPath, fileName) {

    class JsonFile {

        constructor(targetPath, fileName) {
            this.targetPath = targetPath;
            this.fileName = fileName;
            this.filePath = path.join(this.targetPath, this.fileName);
            if (!fileExists(this.targetPath)) {
                mkdirSync(this.targetPath);
            }
            if (!fileExists(this.filePath)) {
                let result = writeFileSync(this.filePath, `[]`);
                console.log(result);
            }
        }

        async getSavedData() {
            let readResult = await readFile(this.filePath);
            return JSON.parse(readResult.data);
        }

        async addData(data, newData = false) {
            let savedData = newData ? [] : await this.getSavedData();

            return await writeFile(this.filePath, JSON.stringify([...savedData, ...data], null, 4))
        }

        async clearData() {
            return await this.addData([], true);
        }

    }

    return new JsonFile(targetPath, fileName);
}
