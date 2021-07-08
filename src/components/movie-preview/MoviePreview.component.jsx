import React from 'react';
import MovieGenre from '../movie-genre/MovieGenre.component';
import './MoviePreview.style.css';
// import play from '../../assets/play.png';

const MoviePreview = ({title, language, release, imageUrl, genre, linkUrl,trailer}) => (
    
    <div className={`${release ? 'release' : ''} movie-preview`}>
        <div className="img-showing">
            <img src={require('../../assets/LK.png').default} />
            <MovieGenre genre={genre} linkUrl={linkUrl}  trailer={trailer}/>
        </div>
        <h4>{title}</h4>
        {
            release 
            ? <p className="releasing">Releasing On <br/><span className="release-date">{release}</span></p>
            :<p>{language}</p>
        }
    </div>
)

export default MoviePreview;

