import React from 'react';
import Character from './Character';

interface ComicItems {
  comicName:string,
  comicImage:string
}

interface ComicType {
  charName:string,
  comicItems:ComicItems[]    
}

interface Props {
    results : ComicType | null
}

const getCard = ({charName, comicItems}:ComicType) :JSX.Element[]=> {
  const cards = comicItems.map((element, index) => {
    return <Character key={index} charName ={charName} comicItems={element}/>
  });
  return cards;
}
const CharacterList : React.FC<Props | null> = ({results}) =>{
    const card = results ? getCard(results) : null;
  
    return <div>
        CharacterList
        <div className="ui stackable grid">          
          {card}          
        </div>
        
    </div>
}

export default CharacterList;
