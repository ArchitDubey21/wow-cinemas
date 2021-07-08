import React from 'react';
import {FaClock, FaShareAlt} from 'react-icons/fa'
import './MovieDetails.style.css';

const MovieDetails = ({nm, len, gnr,lng, lngs, mih ,miv}) => (
    <div className="movie-details" style={{backgroundImage: `url(${mih})`}}>
        <div className="booking-poster">
            <img src={miv} alt=""/>
        </div>
        <div className="booking-movie-details">
            <h3>{nm}</h3>
            
            <p>{len?<FaClock />:''} {len} | {gnr} | {lng} | {lngs}</p>
            {
                len?<div><button className="btn btn-normal"><a href="#">Watch Trailer</a></button> <FaShareAlt className="share"/></div>: ''
            }
            {/* <button className="btn btn-normal"><a href="#">Watch Trailer</a></button> <FaShareAlt className="share"/> */}
        </div>
    </div>
);

export default MovieDetails;