import React, { Component } from 'react';
import './Booking.style.css';
import DisplayWeek from '../../components/display-week/DisplayWeek.component';
import MovieDetails from '../../components/movie-details/MovieDetails.component';
import MovieInfoDetails from '../../components/movie-info-detail/MovieInfoDetails.component';
import MOVIE_DATA from '../../components/now-showing/movie.data';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import SHOWTIMES_DATA from './showtimes.data';
import ShowTime from '../../components/show-time/ShowTime.component';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: this.props.match.params.title,
          collections: MOVIE_DATA,
          showtimes: SHOWTIMES_DATA
        };
      }
    render() {
        const {collections} = this.state;
        const {showtimes} = this.state;
        return (
            <div className="booking">
                <div className="booking-upper">
                        {
                            collections.filter((e) => e.slug === this.state.title)
                            .map(({id, ...otherAdditionalProps}) => (
                                <MovieDetails key={id} {...otherAdditionalProps} />
                            ))
                        }
                    <div className="current-week">
                        <DisplayWeek />
                    </div>
                </div>
                <div className="booking-lower">
                    <div className="movie-info">
                        <h4>movie info</h4>                     
                        {
                        collections.filter((e) => e.slug === this.state.title)
                            .map(({id, ...otherAdditionalProps}) => (
                                <MovieInfoDetails key={id} {...otherAdditionalProps}/>
                            ))    
                        }
                    </div>
                    <div className="showtimes">
                    <Tabs defaultActiveKey="showtimes" id="uncontrolled-tab-example">
                        <Tab eventKey="showtimes" title="showtimes" tabClassName="booking-time">
                            {
                                showtimes.filter((e) => e.slug === this.state.title)
                                .map(({...showtime}) => (
                                    <ShowTime {...showtime}/>
                                ))
                            }
                        </Tab>
                        <Tab eventKey="synopsis" title="synopsis" tabClassName="booking-time">
                            <h4>soon</h4>
                        </Tab>
                    </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}
export default Booking;