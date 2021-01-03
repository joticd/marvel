import React, { useEffect, useReducer } from 'react';
import { bookReducer, updateResults } from '../functions/Functions';
import Character from './Character';
import {ComicItems, ComicType, ComicBookType} from './Interfaces';

type Props = {
    results : ComicType | null
}

type State = ComicBookType[] | [];

const getCard = (comicItems:ComicBookType[], setBookedItem:React.Dispatch<React.SetStateAction<ComicBookType | null>>): JSX.Element[]=> {  
  const cards = comicItems.map(element => {      
    return <Character key={element.comicID} comicItems ={element} onBooked={setBookedItem} />
  });
  
  return cards;
}
const CharacterList : React.FC<Props | null> = ({results}) =>{

    const [bookedItems, dispatch] = useReducer(bookReducer, [], ()=>{
      const comicBooked = localStorage.getItem('comics');
      
      return comicBooked ? JSON.parse(comicBooked) : [];
    });

    useEffect(()=>{
      const comics = JSON.stringify(bookedItems);
      localStorage.setItem('comics', comics)
      
    }, [bookedItems]);

    let newResults = updateResults(results, bookedItems);
    const card = newResults ? getCard(newResults, dispatch) : null;
    
    return <div>
        CharacterList
        <div className="ui stackable grid">          
          {card}          
        </div>
        
    </div>
}

export default CharacterList;
