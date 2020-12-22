import React from 'react';

interface ComicItemsType {
    charName:string,
    comicName:string,
    comicImage:string,
    comicID:number,
    isBooked:boolean
  }

interface Props {
    charName:string,
    coomicBooked:boolean,
    comicItems: {
        comicName:string,
        comicImage:string,
        comicID:number
    },
    onBooked:any    
}

const bookComic = (onBooked:any, info:ComicItemsType):void =>{
    onBooked({type: "ADD_BOOK", bookedItems: info});
}

const Character : React.FC<Props> = ({charName, coomicBooked, comicItems, onBooked}) =>{
    const comicInfo = {
        charName:charName,
        comicName:comicItems.comicName,
        comicImage:comicItems.comicImage,
        comicID:comicItems.comicID,
        isBooked:coomicBooked
    }

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
                    <i 
                        className={`star ${coomicBooked ? "" : "outline"} icon`}
                        onClick={()=>bookComic(onBooked, comicInfo)}
                    ></i>
                </div>
            </div>
        </div>
    );
}

export default Character;
