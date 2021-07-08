import React from 'react';
import './NewsPreview.style.css';

const NewsPreview = ({title, info, uploadDate, imageUrl}) => (
        <div className="news-preview">
            <div className="news-img">
                <img src={process.env.PUBLIC_URL + `/img/${imageUrl}`} alt=""/>
            </div>
            <div className="news-content">
                <p>{uploadDate}</p>
                <h4>{title}</h4>
                <p>{info}</p>
            </div>
        </div>
)

export default NewsPreview;