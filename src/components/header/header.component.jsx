import React from 'react';
import './header.style.css';
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import * as Constants from '../../Constants/index';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            banners: []
        }
    }
    componentDidMount() {

        let formDataUP = new FormData();    //formdata object
        formDataUP.append('city', localStorage.getItem('selectedcity'));   //append the values with key, value pair
        formDataUP.append('av', Constants.av);
        formDataUP.append('pt', Constants.pt);
        formDataUP.append('type', 'WEBSITE');
    
        const bannerRequest = async () => {
    
          try {
            const resp = await axios.post(Constants.api + 'content/bannersnew', formDataUP).then(resp => {
              //  casetype array   
              if (resp.data.result == 'success') {
                this.setState(
                  {
                    loading: 0
                  }
                );
                let bannerArray = []
                        Object.keys(resp.data.output).forEach(function (key) {
                            bannerArray.push(resp.data.output[key])
                        });

                        this.setState({
                            banners: bannerArray,
                            loading:0
                        })
                console.log('banners');
                console.log(this.state.banners);
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
    
        bannerRequest();
      }
    render(){
        const banner = this.state.banners.map(function (item, j) {
            return(
                    <>
                
                    <img
                        className="d-block w-100"
                        src={item.i}
                        alt="First slide"
                        />
                        {/* <h3>AVENGERS: ENDGAME</h3>
                        <p>3h 1min <span className="seperator">|</span> Action, Adventure, Sci-Fi <span className="seperator">|</span> 3D</p>
                        <button className="btn btn-normal"><a href="#">Book now</a></button>
                        <button className="btn btn-ghost"><a href="#">Watch Trailer</a></button>
                        */}
                
                        
                    </>
                 )
        
        });
    return(
        <div className="header">
            <Carousel
              showArrows={true}
              showStatus={false}
              showThumbs={false}>
               {banner}
            </Carousel>
        </div>
    );
    }
}
export default Header; 