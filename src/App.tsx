import React from 'react';
import CharacterList from './components/Character-list';
import SearchBar from './components/Search';


const App : React.FC = () =>{
  return <div>
    <SearchBar />
    <CharacterList />
  </div>
}

export default App;
