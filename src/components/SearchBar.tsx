import './Search.css';
import React, { useEffect, useState } from 'react';
import marvel from '../api/api';
import { hashKey } from '../api/Hash';
import { PRIVATEKEY, PUBLICKEY } from '../api/Keys';
import { loopComics } from '../functions/Functions';
import {ComicType} from './Interfaces';

type Props = {
    onChangeTerm:React.Dispatch<React.SetStateAction<ComicType | null>>,
    onChangeLoader: React.Dispatch<React.SetStateAction<boolean>>
}

const getApiResults = async (
        apiResults:any, 
        debouncedTerm:string |  null, 
        ts:number, hash:string, 
        stateSet: React.Dispatch<React.SetStateAction<ComicType | null>>,
        setLoader: React.Dispatch<React.SetStateAction<boolean>>
    ) =>{
    if(apiResults && debouncedTerm){
        setLoader(true);
        const charName: string = apiResults.name;
        const _items:[] = apiResults.comics.items;
        const comicItems = await loopComics(_items, charName , PUBLICKEY, ts, hash);
        setLoader(false);
        stateSet({comicItems});         
    } else if (!debouncedTerm){
        stateSet(null);
    }
};

const startSearch = (e:React.ChangeEvent<HTMLInputElement>, term: React.Dispatch<React.SetStateAction<string | null>>) =>{
    const searchVal = e.target.value;
    searchVal ? term(searchVal) : term(null);    
};

const SearchBar : React.FC<Props> = ({onChangeTerm, onChangeLoader}) =>{
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
            getApiResults(apiResults, debouncedTerm, ts, hash, onChangeTerm, onChangeLoader);            
        };
        search();
        
    }, [debouncedTerm]);  

    return (
        <div className='search-bar ui segment'>
            <form className="ui form">
                <div className="field">
                    <label>Search</label>
                    <input 
                        type="text"
                        onChange={(event)=>startSearch(event, setTerm)}
                        className="input"
                    />
                </div>
            </form>
        </div>
    ) 
}

export default SearchBar;
