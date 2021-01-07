import './App.css';
import React, { useState } from 'react';
import CharacterList from './components/Comic-list';
import SearchBar from './components/Search';
import Header from './components/Header';
import {ComicType} from './components/Interfaces';

const App : React.FC = () =>{  
const [results, setResults] = useState<ComicType | null>(null);
const [loader, setLoader] = useState<boolean>(false);

return <div className="ui container">
    <Header />
    <SearchBar onChangeTerm = {setResults} onChangeLoader={setLoader} />
    <CharacterList results = {results } loader = {loader } />
  </div>
}

export default App;
