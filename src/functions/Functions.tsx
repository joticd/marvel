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


    
    switch (action.type) {
        case "ADD_BOOK":
            console.log("11111111111111",bookedItems)
            return[...state, {
                charName: bookedItems.charName,
                comicName: bookedItems.comicName,
                comicImage: bookedItems.comicImage,
                comicID: bookedItems.comicID,
                isBooked: bookedItems.isBooked
            }];
        case "REMOVE_BOOK":
            console.log("222222222222",bookedItems)
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
        comicItemsType:ComicItemsType,
        onBooked:React.Dispatch<any>  
    )=>{
    let type = isBooked ? "ADD_BOOK" : "REMOVE_BOOK";
    let bookedItems = comicItemsType;
    onBooked({type, bookedItems});
};