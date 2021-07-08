import React from 'react';
import './MovieInfoDetails.style.css';

const MovieInfoDetails = ({od,p }) => (
    <div className="movie-info-detail">
        <div className="movie-info-left">
            Release:
        </div>
        <div className="movie-info-right">
            {od}
        </div>
        <div className="movie-info-left">
            Director:
        </div>
        <div className="movie-info-right">
            abc
        </div>
        <div className="movie-info-left">
            Writers:
        </div>
        <div className="movie-info-right">
            abc
        </div>
        <div className="movie-info-left">
            Starring:
        </div>
        <div className="movie-info-right">
            abc
        </div>
        <p class="movie-about">{p}</p>
    </div>
);

export default MovieInfoDetails;