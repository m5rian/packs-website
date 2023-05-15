import * as fs from "fs";

export function readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(`packs/${filePath}`, (err, data) => {
            if (err) {
                reject(err)
                return
            }

            const string = data.toString()
            resolve(string)
        })
    })
}

export function readFileRaw(filePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        fs.readFile(`packs/${filePath}`, (err, data) => {
            if (err) {
                reject(err)
                return
            }

            resolve(data)
        })
    })
}

export function listFolderFiles(folderPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(`packs/${folderPath}`, (err, files) => {
            if (err) {
                reject(err)
                return
            }

            resolve(files)
        })
    })
}

export function writeFile(filePath: string, content: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.writeFile(`packs/${filePath}`, content, (err) => {
            if (err) {
                reject(err)
                return
            }

            resolve(true)
        })
    })
}