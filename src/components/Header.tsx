import React from 'react';

const Header : React.FC = () =>{
  
    return (        
        <div >
            <img className="ui centered large image" src={`${process.env.PUBLIC_URL}/marvelLogo.png`} alt=""/>
        </div>            
    );
}

export default Header;
