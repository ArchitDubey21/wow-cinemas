import React from 'react';
import {FaPlayCircle} from 'react-icons/fa'
// import play from '../../assets/play.png';
import './SuggestionPreview.style.css';

const SuggestionPreview = ({ handleClickEvent,title, genre, imageUrl,trailer}) => (
    <div onClick={()=>handleClickEvent(trailer)} className="suggestion-preview">
        <div className="suggestion-box">
            <div className="suggestion-img">
                <img src={process.env.PUBLIC_URL + `/img/${imageUrl}`} alt=""/>
                <FaPlayCircle />
            </div>
        </div>
        <div className="suggestion-detail">
            <h4>{title}</h4>
            <p>{genre}</p>
        </div>
    </div>
)

export default SuggestionPreview;