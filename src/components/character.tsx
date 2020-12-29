import React, { useEffect, useState } from 'react';

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

const starClick =(bookedBool:boolean, setBookedBool:React.Dispatch<React.SetStateAction<boolean>>)=>{
    let boolVal = !bookedBool;
    console.log("BBBBBBBBBBBBBBBBBB",bookedBool) 
    setBookedBool(boolVal);
};

const Character : React.FC<Props> = ({charName, coomicBooked, comicItems, onBooked}) =>{
    const comicInfo = {
        charName,
        comicName:comicItems.comicName,
        comicImage:comicItems.comicImage,
        comicID:comicItems.comicID,
        isBooked:coomicBooked
    };

    const [bookedBool, setBookedBool] = useState<boolean>(coomicBooked);
    
    useEffect(()=>{
        comicInfo.isBooked = bookedBool;
        let reduceType = bookedBool ? "ADD_BOOK" : "REMOVE_BOOK";  
        console.log("AAAAAAAAAAAAAAAAAA",bookedBool, reduceType) 
        onBooked({type: reduceType, bookedItems: comicInfo});
    },[bookedBool]);
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
                        className={`star ${bookedBool ? "" : "outline"} icon`}
                        onClick={()=>starClick(bookedBool, setBookedBool)}
                    ></i>
                </div>
            </div>
        </div>
    );
}

export default Character;
