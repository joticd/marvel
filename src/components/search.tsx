import React, {useEffect, useState} from 'react';
import marvel from '../api/api';
import {hashKey} from '../api/Hash';
import {PRIVATEKEY, PUBLICKEY} from '../api/Keys';


const SearchBar : React.FC = () =>{
    const [term, setTerm] = useState('');
    useEffect(()=>{
        console.log(term)

        const search = async () =>{
            const ts = Date.now();
            const hash = hashKey(ts,PRIVATEKEY,PUBLICKEY);
            const data = await marvel.get('https://gateway.marvel.com/v1/public/characters', {
               params : {
                apikey: '304f21ac8fb3db8db0ec69dd213191ea',
                ts,
                hash,
                limit: 20,
                name:'deadpool'
               }
           });

           console.log(data)
        }

        if(term!==""){
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
