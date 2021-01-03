import { getComicUrl } from '../api/api';
import {ComicItems, ComicType, ComicBookType} from '../components/Interfaces';

type State = ComicBookType[] | [];

export const loopComics = async (array:any, name: string, apikey:string, ts:number, hash:string):Promise<ComicItems[]> =>{
    const comicItemsArray:ComicItems[] = [];  
   
    await Promise.all(array.map(async (apiData:any) => {
        const {data} = await getComicUrl(apiData.resourceURI, apikey, ts, hash);
        const results = data.results[0];
        const comicName:string = results.title;
        const comicImage:string = `${results.thumbnail.path}.${results.thumbnail.extension}`;
        const comicID:number = results.id;
        const charName: string = name;              
        comicItemsArray.push({charName, comicName, comicImage, comicID});
    })); 
    
    return comicItemsArray;   
};

export const updateResults = (results: ComicType | null, bookedItems:ComicBookType[]): ComicBookType[] | null =>{
    let updateResults : ComicBookType[] | null = null;
    if(results){
        updateResults=[];
        const {comicItems}=results;
        loopComicItems(updateResults, comicItems, bookedItems);
    } else if(!results && bookedItems.length>0){
        updateResults = bookedItems;
    };
    return updateResults;
}

const loopComicItems = (updateResults : ComicBookType[], comicItems: ComicItems[], bookedItems:ComicBookType[]) =>{
    for(let i in comicItems){
        let isBooked = isBookedFun(comicItems[i], bookedItems);
        updateResults.push({...comicItems[i], isBooked});
    }
}

const isBookedFun = (element :ComicItems, bookedItems:ComicBookType[]) =>{
    return bookedItems.some(comic => comic.comicID === element.comicID)
}

export const bookReducer = (state:State, action:any):State => {
    const {bookedItems} = action;    
    switch (action.type) {
        case "ADD_BOOK":
            return[...state, {
                charName: bookedItems.charName,
                comicName: bookedItems.comicName,
                comicImage: bookedItems.comicImage,
                comicID: bookedItems.comicID,
                isBooked: bookedItems.isBooked
            }];
        case "REMOVE_BOOK":
            return state.filter(element => element.comicID !== bookedItems.comicID);
    
        default:
            return state;
    }
}

export const starClick =(setIsClicked:React.Dispatch<React.SetStateAction<boolean>>)=>{
    
    setIsClicked(true);    
};

export const ifClicked =(
        isClicked:boolean, 
        bookedBool: boolean,
        setBooked:React.Dispatch<React.SetStateAction<boolean>>,
        setClicked:React.Dispatch<React.SetStateAction<boolean>>
    )=>{
        
    if(isClicked){
        let bookedVal = !bookedBool;
        setBooked(bookedVal);
        // setClicked(false);
    }
};

export const dispatchBook =(
        isBooked:boolean, 
        comicItemsType:ComicBookType,
        onBooked:React.Dispatch<any>  
    )=>{
    let type = isBooked ? "ADD_BOOK" : "REMOVE_BOOK";
    let bookedItems = comicItemsType;
    onBooked({type, bookedItems});
};