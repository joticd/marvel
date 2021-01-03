import React, { useState } from 'react';
import CharacterList from './components/Character-list';
import SearchBar from './components/Search';
import {ComicItems, ComicType} from './components/Interfaces';

const App : React.FC = () =>{  
const [results, setResults] = useState<ComicType | null>(null);
return <div className="ui container">
    <SearchBar onChangeTerm = {setResults} />
    <CharacterList results = {results } />
  </div>
}

export default App;
