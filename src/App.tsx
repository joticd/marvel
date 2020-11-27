import React from 'react';
import Characters from './components/characters';
import SearchBar from './components/search';


const App : React.FC = () =>{
  return <div>
    <SearchBar />
    <Characters />
  </div>
}

export default App;
