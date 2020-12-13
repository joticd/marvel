import React from 'react';

interface Props {
    charName:string,
    comicItems: {
        comicName:string,
        comicImage:string
    }    
}

const Character : React.FC<Props> = ({charName, comicItems}) =>{
    console.log(charName, comicItems)
    return (
        <div className="sixteen wide mobile eight wide tablet four wide computer column">
            <div className="ui card">
                <div className="image">
                    <img src={comicItems.comicImage} alt=""/>
                </div>
                <div className="content">
                    <div className="meta">
                        <span className="date">Name</span>
                    </div>
                    <div className="header">{charName}</div>
                    
                    
                    <div className="description">
                        <div className="meta">
                            <span className="date">Title</span>
                        </div>
                        {comicItems.comicName}
                    </div>
                </div>
                <div className="extra content">
                    <i className="star outline icon"></i>
                </div>
            </div>
        </div>
    );
}

export default Character;
