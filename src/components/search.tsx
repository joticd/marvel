import React, { useEffect, useState } from 'react';
import marvel, {getComicUrl} from '../api/api';
import { hashKey } from '../api/Hash';
import { PRIVATEKEY, PUBLICKEY } from '../api/Keys';
import {createItemsArray} from '../functions/Functions';

interface ComicItems {
    comicName:string,
    comicUrl:string
}

interface ComicType {
    charName:string,
    comicItems:ComicItems[]    
}

const SearchBar : React.FC = () =>{
    const [term, setTerm] = useState<string | null>(null);
    const [debouncedTerm, setDebouncedTerm] = useState<string | null>(null);
    const [results, setResults] = useState<ComicType | null>(null);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedTerm(term);      
        }, 500); 
        return ()=>{
            clearTimeout(timer);
        }; 
    }, [term]);

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
                name:debouncedTerm
               }
           });

           const apiResults = data.data.results[0];
           if(apiResults && debouncedTerm){
               const _items:[] = apiResults.comics.items;
               const charName:string = apiResults.name;
               const comicItems:ComicItems[] = createItemsArray(_items);
               console.log(debouncedTerm, charName, comicItems) 
               getComicUrl(comicItems[0].comicUrl, PUBLICKEY, ts, hash )
               setResults({charName, comicItems});              
            }
        };

        
        search();
        
    }, [debouncedTerm]);  

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
