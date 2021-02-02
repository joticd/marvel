import React, { useState } from 'react';
import './App.css';
import CharacterList from './components/Comic-list';
import Header from './components/Header';
import { ComicType } from './components/Interfaces';
import SearchBar from './components/SearchBar';

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
