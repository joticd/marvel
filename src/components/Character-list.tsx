import React, { useEffect, useReducer } from 'react';
import { bookReducer } from '../functions/Functions';
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

const getCard = ({charName, comicItems}:ComicType, setBookedItem:React.Dispatch<React.SetStateAction<ComicItemsType | null>>, bookedItems:any) :JSX.Element[]=> {
  const cards = comicItems.map((element, index) => {  
    console.log("EEEEEEEEEEEEEEE",bookedItems)  
    return <Character key={element.comicID} charName ={charName} coomicBooked={false} comicItems={element} onBooked={setBookedItem} />
  });
  return cards;
}
const CharacterList : React.FC<Props | null> = ({results}) =>{

    const [bookedItems, dispatch] = useReducer(bookReducer, [], ()=>{
      const comicBooked = localStorage.getItem('comics');
      console.log("BBBBBBBBBBBBBBBB",comicBooked)
      return comicBooked ? JSON.parse(comicBooked) : [];
    });

    useEffect(()=>{
      const comics = JSON.stringify(bookedItems);
      localStorage.setItem('comics', comics)
      console.log("CCCCCCCCCCCCCCCCCCCC",bookedItems)
    }, [bookedItems]);

    console.log("AAAAAAAAAAAAA",bookedItems)

    const card = results ? getCard(results, dispatch, bookedItems) : null;
  
    return <div>
        CharacterList
        <div className="ui stackable grid">          
          {card}          
        </div>
        
    </div>
}

export default CharacterList;
