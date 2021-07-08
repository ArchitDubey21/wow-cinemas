import React from 'react';
import SuggestionPreview from '../suggestion-preview/SuggestionPreview.component';
import UPCOMINGMOVIE_DATA from '../upcoming-movies/upcomingmovies.data';
import './Trailer.style.css';
import axios from "axios";
import * as Constants from '../../Constants/index';
import swal from 'sweetalert';

class Trailer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collections: UPCOMINGMOVIE_DATA,
            trailerUrl: '7TavVZMewpY'
        }
    }
    componentDidMount(){
      //alert("Dsds");
        let formDataUP = new FormData();    //formdata object
        formDataUP.append('city', localStorage.getItem('selectedcity'));   //append the values with key, value pair
        formDataUP.append('av', Constants.av);
        formDataUP.append('pt', Constants.pt);
        formDataUP.append('did', Constants.did);
        formDataUP.append('userid', localStorage.getItem('userid'));
        formDataUP.append('lang', 'ALL');
        
        const trailerRequest = async() => {
            try {
                const resp = await axios.post(Constants.api + 'content/trailers', formDataUP).then(resp => {
                  //  casetype array   
                  
                  if (resp.data.result == 'success') {
                    this.setState(
                      {
                        loading: 0
                      }
                    );
                    console.log(resp.data.output);
                  
                  } else {
                    console.log(resp.data.msg);
                    this.setState(
                      {
                        loading: 0
                      }
                    );
                  }
                  //movie array
                });
        
              } catch (err) {
                // Handle Error Here
                console.error(err);
              }
            };
           // trailerRequest();
        
        }
    
    handleClickEvent = (trailer) => {
        this.setState({
            trailerUrl: trailer
        })
    }
    render(){
        const {collections} = this.state;   
        return(
            <div className="trailer">
                <h3>trailers & videos</h3>
                <div className="display-trailer">
                    <div className="video-player">
                    <iframe 
                        src={`https://www.youtube.com/embed/${this.state.trailerUrl}`}
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>                    
                    </iframe>
                    </div>
                    <div className="suggestions">
                        {
                            collections.filter((item,idx) => idx < 4).map(({id, ...otherAdditionalProps}) => (
                                <SuggestionPreview handleClickEvent={()=>this.handleClickEvent('lll')} key={id} {...otherAdditionalProps} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Trailer;