import React from 'react';
import Carousel from 'react-multi-carousel';
import MoviePreview from '../movie-preview/MoviePreview.component';
import UPCOMINGMOVIE_DATA from './upcomingmovies.data.js';
import 'react-multi-carousel/lib/styles.css';
import './UpcomingMovies.style.css';
import axios from "axios";
import * as Constants from '../../Constants/index';
import swal from 'sweetalert';
import MovieGenre from '../movie-genre/MovieGenre.component';

class UpcomingMovies extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      upcoming: [],
      collections: UPCOMINGMOVIE_DATA,
      loading:1
    }
  }
  componentDidMount() {

    let formDataUP = new FormData();    //formdata object
    formDataUP.append('city', localStorage.getItem('selectedcity'));   //append the values with key, value pair
    formDataUP.append('av', Constants.av);
    formDataUP.append('pt', Constants.pt);
    formDataUP.append('did', Constants.did);
    formDataUP.append('userid', localStorage.getItem('userid'));
    formDataUP.append('lang', 'ALL');

    const upcomingRequest = async () => {

      try {
        const resp = await axios.post(Constants.api + 'content/comingsoon', formDataUP).then(resp => {
          //  casetype array   
          if (resp.data.result == 'success') {
            this.setState(
              {
                loading: 0
              }
            );
            console.log(resp.data.output);
            let upcomingArray = []
            Object.keys(resp.data.output).forEach(function (key) {
              upcomingArray.push(resp.data.output[key])
            });

            this.setState({
              upcoming: upcomingArray,
            })
            console.log('comingsoon');
            console.log(this.state.upcoming);
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

    upcomingRequest();
  }

  render() {
    let count = 0;
    const upcoming = this.state.upcoming.map(function (item, i) {
    const otherCollectionProps= {
        
            id: i,
            title: item.mname,
            language: item.lng,
            genre: item.genre,
            director: item.mdirector,
            writers: 'Christopher Markus and Stephen McFeely',
            starring: item.martists,
            details: item.mlength,
            // imageUrl: item.miv,
            imageUrl: 'NTTD.jpg',
            slug: 'MIB',
            linkUrl: '',
            releasing: item.mopeningdate,
            trailer:item.mtrailerurl
          
    }
   
        count = count+1;
        return(

            <>
                           <div className='release'>
        <div className="img-showing">
            <img src={require('../../assets/LK.png').default} />
            <MovieGenre genre={item.mgenre} linkUrl=''  trailer={item.mtrailerurl}/>
        </div>
        <h4>{item.name}</h4>
        {
            item.mopeningdate !== undefined 
            ? <p className="releasing">Releasing On <br/><span className="release-date">{item.mopeningdate}</span></p>
            :<p>{item.lng}</p>
        }
    </div>
                 
            </>
        )
    
    });
    const { collections } = this.state;
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
      const { carouselState: { currentSlide } } = rest;
      return (
        <div className="carousel-button-group">
          <button className={currentSlide === 0 ? 'disable' : 'left-btn-slide'} onClick={() => previous()} > &#8592; </button>
          <button className='right-btn-slide' onClick={() => next()} > &#8594; </button>
        </div>
      );
    };

    return (
      <div className="upcoming-movies">
        <h3>Upcoming Movies</h3>
        <div className="show-upcoming">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            arrows={false}
            renderButtonGroupOutside={true}
            customButtonGroup={<ButtonGroup />}
          >
            {
              upcoming
            }
          </Carousel>
        </div>
      </div>
    )
  }
}
export default UpcomingMovies;