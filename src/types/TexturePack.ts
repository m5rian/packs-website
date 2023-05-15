export interface PackDetails {
    folderName: string,
    name: string,
    downloads: number,
    videoId: string,
    releaseDate: number
    authors: Author[]
}

export interface Author {
    name: string,
    avatar: string
}