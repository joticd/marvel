export interface ComicItems {
    charName:string,
    comicName:string,
    comicImage:string,
    comicID:number
}

export interface ComicType {
    comicItems:ComicItems[];   
}

export interface ComicBookType {
    charName:string,
    comicName:string,
    comicImage:string,
    comicID:number,
    isBooked:boolean
}

export interface ItemType {
    comicBookItem:ComicBookType,
    onBooked:React.Dispatch<any>
}



