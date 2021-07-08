import React from 'react';
import './FactorsPreview.style.css'

const FactorsPreview = ({title,data,imageUrl}) => (
    <div className="factors-preview">
        <div className="factors-img">
            <img src={process.env.PUBLIC_URL + `/img/${imageUrl}`} alt=""/>
        </div>
        <h4>{title}</h4>
        <p>{data}</p>
    </div>
)

export default FactorsPreview;