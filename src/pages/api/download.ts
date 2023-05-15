import {NextApiRequest, NextApiResponse} from 'next';
import {listFolderFiles, readFile, writeFile} from "@/utils";
import {Readable} from "stream";
import {createReadStream} from "fs";
import {PackDetails} from "@/types/TexturePack";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pack = req.query.pack
    const version = req.query.version

    const fileName = await listFolderFiles(`${pack}/downloads/${version}`)
        .then(files => files[0])
    const filePath = `packs/${pack}/downloads/${version}/${fileName}`

    res.setHeader("Content-Type", "application/octet-stream")
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`)
    res.setHeader("Filename", fileName)

    const fileStream = createReadStream(filePath)
    const fileStreamReadable = new Readable().wrap(fileStream)
    fileStreamReadable.pipe(res)

    updateDownloadCount(pack as string)
        .then(() => {
        })
}

async function updateDownloadCount(packName: string) {
    const packDetails = await readFile(`${packName}/pack.json`)
        .then(text => JSON.parse(text))
        .then(json => json as PackDetails)
    packDetails.downloads++
    await writeFile(`${packName}/pack.json`, JSON.stringify(packDetails))
}