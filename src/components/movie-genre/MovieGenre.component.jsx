import React from 'react';
import './MovieGenre.style.css';
import { withRouter,Link } from 'react-router-dom'; 
import play from '../../assets/play.png';

const MovieGenre = ({genre,history,linkUrl,match,trailer}) => (
    <div className="movie-genre">
        <p>{genre}</p>
        
        <div className="book">
            <a href={linkUrl} className="club book-now">
                BOOK NOW
            </a>
            <a href="#"><img className="icon" src={play} alt=""/></a>
        </div>
        <div className="trailer-btn">
            {(trailer !='')?
            <button className="club book-now"><a href="#">Watch Trailer</a></button>:''}
        </div>
    </div>
)
export default withRouter(MovieGenre);