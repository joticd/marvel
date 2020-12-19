import React, { useState } from 'react';
import Character from './Character';

interface ComicItems {
  comicName:string,
  comicImage:string,
  comicID:number
}

interface ComicType {
  charName:string,
  comicItems:ComicItems[]    
}

interface ComicItemsType {
  charName:string,
  comicName:string,
  comicImage:string,
  comicID:number,
  isBooked:boolean
}

interface Props {
    results : ComicType | null
}

const getCard = ({charName, comicItems}:ComicType, setBookedItem:React.Dispatch<React.SetStateAction<ComicItemsType | null>>) :JSX.Element[]=> {
  const cards = comicItems.map((element, index) => {    
    return <Character key={element.comicID} charName ={charName} coomicBooked={false} comicItems={element} onBooked={setBookedItem}/>
  });
  return cards;
}
const CharacterList : React.FC<Props | null> = ({results}) =>{

    const [bookedItem, setBookedItem] = useState<ComicItemsType | null>(null);


    console.log(bookedItem)

    const card = results ? getCard(results, setBookedItem) : null;
  
    return <div>
        CharacterList
        <div className="ui stackable grid">          
          {card}          
        </div>
        
    </div>
}

export default CharacterList;
