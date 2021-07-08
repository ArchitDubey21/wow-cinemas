import React from 'react';
import './ShowTime.style.css';

const ShowTime = ({english3d,hindi3d,english2d,imax}) => (
    <div className="show-time">
        {english3d.map((timing) => <span className="time-box">{timing}</span>)}
        <br />
        {hindi3d.map((timing) => <span className="time-box">{timing}</span>)}
        <br />
        {english2d.map((timing) => <span className="time-box">{timing}</span>)}
        <br />
        {imax.map((timing) => <span className="time-box">{timing}</span>)}
    </div>
);

export default ShowTime;