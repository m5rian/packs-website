export interface PackDetails {
    folderName: string,
    name: string,
    downloads: number,
    videoId: string,
    releaseDate: number
    authors: Author[]
    /**
     * 0 Texture pack
     * 1 Pack bundle
     */
    type: number,
    data: Metadata
    tags: TagInfo[]
}

export interface Author {
    name: string,
    avatar: string,
    youtube: string
}

export interface Metadata {
    [key: string]: any[] | undefined;
}

export interface TagInfo {
    title: string
    type: string
    colour: string | null
}