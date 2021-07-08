import React from 'react';
import './DisplayWeek.style.css';

const DisplayWeek = (days,sdate,sday) => {
    const weekDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let daysDispay = [];
    for (let i = 0; i<7; i++){
        const d = new Date();
        d.setDate(d.getDate() + i);
        const day = weekDay[d.getDay()];
        const month = months[d.getMonth()];
        const date = d.getDate();
        daysDispay.push(
            <button className="btn btn-week">{month}<br />{date} <br />{day}</button>
        );
    }
    console.log(sdate);
    return(
        <div className="display-week">
            {daysDispay}
            <div className="filling-data">
                <p>AVAILABLE</p>
                <p>FILLING FAST</p>
                <p>SOLD OUT</p>
                <p>LAPSED</p>
            </div>
            <ul>
        </ul>
        </div>
    );
    
}
export default DisplayWeek;