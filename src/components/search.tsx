import React, { useEffect, useState } from 'react';
import marvel from '../api/api';
import { hashKey } from '../api/Hash';
import { PRIVATEKEY, PUBLICKEY } from '../api/Keys';

interface ComicItems {
    comicName:string,
    comicUrl:string
}

interface Char {
    charName:string,
    comicItems:ComicItems[]    
}

const SearchBar : React.FC = () =>{
    const [term, setTerm] = useState<string | null>(null);
    const [results, setResults] = useState(null);
    useEffect(()=>{

        const search = async () =>{
            const ts = Date.now();
            const hash = hashKey(ts,PRIVATEKEY,PUBLICKEY);
            const {data} = await marvel.get('/characters', {
               params : {
                apikey: PUBLICKEY,
                ts,
                hash,
                limit: 20,
                name:term
               }
           });

           const apiResults = data.data.results[0];
           const _items = apiResults.comics.items;
           let charName : string = apiResults.name;


           console.log(_items)
        }

        if(term){
            search();
        }

    }, [term]);
    return (
        <div className='search-bar ui segment'>
            <form className="ui form">
                <div className="field">
                    <label>Video Search</label>
                    <input 
                        type="text"
                        onChange={(event)=>setTerm(event.target.value)}
                        className="input"
                    />
                </div>
            </form>
        </div>
    ) 
}

export default SearchBar;
