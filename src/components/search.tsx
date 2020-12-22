import React, { useEffect, useState } from 'react';
import marvel from '../api/api';
import { hashKey } from '../api/Hash';
import { PRIVATEKEY, PUBLICKEY } from '../api/Keys';
import { loopComics } from '../functions/Functions';

interface ComicItems {
    comicName:string,
    comicImage:string,
    comicID:number
}

interface ComicType {
    charName:string,
    comicItems:ComicItems[]    
}

interface Props {
    onChangeTerm:React.Dispatch<React.SetStateAction<ComicType | null>>
}

const getApiResults = async (apiResults:any, debouncedTerm:string |  null, ts:number, hash:string, stateSet: React.Dispatch<React.SetStateAction<ComicType | null>>) =>{
    if(apiResults && debouncedTerm){
        const _items:[] = apiResults.comics.items;
        const comicItems:ComicItems[] = await loopComics(_items, PUBLICKEY, ts, hash);
        const charName:string = debouncedTerm;
        stateSet({charName, comicItems});         
    }
}

const SearchBar : React.FC<Props> = ({onChangeTerm}) =>{
    const [term, setTerm] = useState<string | null>(null);
    const [debouncedTerm, setDebouncedTerm] = useState<string | null>(null);
   
    
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
            console.log(data)
            getApiResults(apiResults, debouncedTerm, ts, hash, onChangeTerm);            
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
