import React from 'react';
import NewsPreview from '../news-preview/NewsPreview.component';
import NEWS_DATA from './news.data';
import './News.style.css';

class News extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collections: NEWS_DATA
        }
    }
    render(){
        const {collections} = this.state;
        return(
            <div className="news">
                <h3>latest news</h3>
                <div className="news-preview-collection">
                    {
                        collections.map(({id, ...otherAdditionalProps}) =>
                            <NewsPreview key={id} {...otherAdditionalProps}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default News;