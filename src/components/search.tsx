import React, {useEffect, useState} from 'react';

const SearchBar : React.FC = () =>{
    const [term, setTerm] = useState('');
    useEffect(()=>{
        console.log(term)
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
