import './Comic.css';
import React, { useEffect, useState } from 'react';
import {ComicBookType} from './Interfaces';
import {starClick, ifClicked, dispatchBook} from '../functions/Functions';

interface Props {
    comicItems:ComicBookType,
    onBooked:React.Dispatch<any>    
}

const Character : React.FC<Props> = ({comicItems, onBooked}) =>{
    const comicInfo = {
        charName : comicItems.charName,
        comicName : comicItems.comicName,
        comicImage : comicItems.comicImage,
        comicID : comicItems.comicID,
        isBooked : comicItems.isBooked
    };

    const [bookedBool, setBookedBool] = useState<boolean>(comicInfo.isBooked);
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
            <div className="ui card single-card">
                <div className="image">
                    <img src={comicInfo.comicImage} alt=""/>
                </div>
                <div className="content">
                    <div className="meta">
                        <span className="date">Name</span>
                    </div>
                    <div className="header">{comicInfo.charName}</div>
                    <div className="description">
                        <div className="meta">
                            <span className="date">Title</span>
                        </div>
                        {comicInfo.comicName}
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
