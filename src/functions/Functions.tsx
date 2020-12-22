import { getComicUrl } from '../api/api';

interface ComicItems {
    comicName:string,
    comicImage:string,
    comicID:number
}

interface ComicItemsType {
    charName:string,
    comicName:string,
    comicImage:string,
    comicID:number,
    isBooked:boolean
}

type State = ComicItemsType[] | [];

export const createItemsArray = (apiItems:[]):ComicItems[] =>{
    const items:ComicItems[] = [];

    // apiItems.forEach((element:any) =>{
    //     items.push({
    //         comicName: element.name,
    //         // comicUrl: element.resourceURI
    //     });
    // });
    return items;
}

export const loopComics = async (array:any, apikey:string, ts:number, hash:string):Promise<ComicItems[]> =>{
    const comicItemsArray:ComicItems[] = [];  
    
    await Promise.all(array.map(async (apiData:any) => {
        const {data} = await getComicUrl(apiData.resourceURI, apikey, ts, hash);
        const results = data.results[0];
        const comicName:string = results.title;
        const comicImage:string = `${results.thumbnail.path}.${results.thumbnail.extension}`;
        const comicID:number = results.id;
       
        comicItemsArray.push({comicName, comicImage, comicID});
    })); 
    
    return comicItemsArray;
   
}

export const bookReducer = (state:State, action:any) => {
    const {bookedItems} = action;
    console.log(state)  
    switch (action.type) {
        case "ADD_BOOK":
            return[...state, {
                charName: bookedItems.charName,
                comicName: bookedItems.comicName,
                comicImage: bookedItems.comicImage,
                comicID: bookedItems.comicID,
                isBooked: bookedItems.isBooked
            }];
    
        default:
            return state;
    }
}