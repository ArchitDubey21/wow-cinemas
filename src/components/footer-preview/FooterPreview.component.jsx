import React from 'react';
import './FooterPreview.style.css';

const FooterPreview = ({title,data}) => (
    <div className="footer-preview">
        <h4 className="title">{title.toUpperCase()}</h4>
        <ul className="footer-list">
            {
                data.map((item) => 
                <li><a href="#">{item}</a></li>
                )
            }            
        </ul>
    </div>
)

export default FooterPreview;