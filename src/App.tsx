import './App.css';
import React, { useState } from 'react';
import CharacterList from './components/Comic-list';
import SearchBar from './components/Search';
import Header from './components/Header';
import {ComicType} from './components/Interfaces';

const App : React.FC = () =>{  
const [results, setResults] = useState<ComicType | null>(null);
return <div className="ui container">
    <Header />
    <SearchBar onChangeTerm = {setResults} />
    <CharacterList results = {results } />
  </div>
}

export default App;
