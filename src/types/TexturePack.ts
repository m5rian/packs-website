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
    data: Record<string, any>
    tags: TagInfo[]
}

export interface Author {
    name: string,
    avatar: string
}

export interface TagInfo {
    title: string
    colour: string | null
}