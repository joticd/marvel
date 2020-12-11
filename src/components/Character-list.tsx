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
const CharacterList : React.FC<Props | null> = ({results}) =>{
    console.log(results);
    return <div>
        CharacterList
        <div className="ui stackable grid">
          <div className="sixteen wide mobile eight wide tablet four wide computer column">
            <Character />
          </div>
        </div>
        
    </div>
}

export default CharacterList;
