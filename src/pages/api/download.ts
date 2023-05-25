import {NextApiRequest, NextApiResponse} from 'next';
import {listFolderFiles, readFile, writeFile} from "@/utils";
import {Readable} from "stream";
import {createReadStream} from "fs";
import {PackDetails} from "@/types/TexturePack";

export const config = {
    api: {
        responseLimit: '25mb',
    },
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pack = req.query.pack as string
    const variant = req.query.variant as (string | undefined)
    const isPackBundle = variant !== undefined
    const version = req.query.version as string

    const packPath = isPackBundle
        ? `${pack}/packs/${variant}/downloads/${version}`
        : `${pack}/downloads/${version}`
    const fileName = await listFolderFiles(packPath)
        .then(files => files[0])
    const filePath = isPackBundle
        ? `packs/${pack}/packs/${variant}/downloads/${version}/${fileName}`
        : `packs/${pack}/downloads/${version}/${fileName}`

    res.setHeader("Content-Type", "application/octet-stream")
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`)
    res.setHeader("Filename", fileName)

    const fileStream = createReadStream(filePath)
    const fileStreamReadable = new Readable().wrap(fileStream)
    fileStreamReadable.pipe(res)

    const promises: Promise<void>[] = []
    promises.push(increaseDownloadCount(pack))
    if (isPackBundle) promises.push(increaseDownloadCount(`${pack}/packs/${variant}`))
    Promise.all(promises).catch(error => {
        console.error(error)
    })
}

async function increaseDownloadCount(packFolderPath: string) {
    const packDetails = await readFile(`${packFolderPath}/pack.json`)
        .then(text => JSON.parse(text))
        .then(json => json as PackDetails)
    packDetails.downloads++
    await writeFile(`${packFolderPath}/pack.json`, JSON.stringify(packDetails))
}