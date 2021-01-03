import React, { useEffect, useState } from 'react';
import marvel from '../api/api';
import { hashKey } from '../api/Hash';
import { PRIVATEKEY, PUBLICKEY } from '../api/Keys';
import { loopComics } from '../functions/Functions';
import {ComicItems, ComicType} from './Interfaces';

type Props = {
    onChangeTerm:React.Dispatch<React.SetStateAction<ComicType | null>>
}

const getApiResults = async (apiResults:any, debouncedTerm:string |  null, ts:number, hash:string, stateSet: any) =>{
    if(apiResults && debouncedTerm){
        const charName: string = apiResults.name;
        const _items:[] = apiResults.comics.items;
        const comicItems:any = await loopComics(_items, charName , PUBLICKEY, ts, hash);
        stateSet({comicItems});         
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
