import React, { useEffect, useState } from 'react';
import {starClick, ifClicked, dispatchBook} from '../functions/Functions';

// interface ComicItemsType {
//     charName:string,
//     comicName:string,
//     comicImage:string,
//     comicID:number,
//     isBooked:boolean
// }

interface Props {
    charName:string,
    coomicBooked:boolean,
    comicItems: {
        comicName:string,
        comicImage:string,
        comicID:number
    },
    onBooked:React.Dispatch<any>    
}

const Character : React.FC<Props> = ({charName, coomicBooked, comicItems, onBooked}) =>{
    const comicInfo = {
        charName,
        comicName:comicItems.comicName,
        comicImage:comicItems.comicImage,
        comicID:comicItems.comicID,
        isBooked:coomicBooked
    };

    const [bookedBool, setBookedBool] = useState<boolean>(coomicBooked);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    useEffect(()=>{        
        if(isClicked){
            comicInfo.isBooked = bookedBool;
            dispatchBook(bookedBool, comicInfo, onBooked);
            setIsClicked(false);
        }
    },[bookedBool]);
    
    useEffect(()=>{               
        ifClicked(isClicked, bookedBool, setBookedBool, setIsClicked);        
    },[isClicked]);
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
                        onClick={()=>starClick(setIsClicked)}
                    ></i>
                </div>
            </div>
        </div>
    );
}

export default Character;
