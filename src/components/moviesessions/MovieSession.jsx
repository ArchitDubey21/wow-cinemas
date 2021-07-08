import React, { Component } from 'react';
// import Header from './Header';
// import Footer from './Footer';
import * as Constants from '../../Constants/index';
import Loading from '../../Constants/Loading';
// import '../App.css';
import axios from "axios";
import './MovieSession.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MovieDetails from '../movie-details/MovieDetails.component';
// import DisplayWeek from '../display-week/DisplayWeek.component';
import MovieInfoDetails from '../movie-info-detail/MovieInfoDetails.component';
import swal from 'sweetalert';
// import ShowTime from '../show-time/ShowTime.component';

class MovieSession extends Component {

    // constructor(props) {
    //     super(props);
    // }

    state = {
        city: this.props.match.params.city,
        amcode: this.props.match.params.amcode,
        mname: this.props.match.params.moviename,
        lat: 0.0,
        lng: 0.0,
        date: '',
        lang: 'ALL',
        format: 'ALL',
        price: 'ALL',
        time: 'ALL',
        cinetype: 'ALL',
        special: 'ALL',
        hc: 'ALL',
        output: {},
        lngs: [],
        cinemas: [],
        days: [],
        selectedDate: '',
        selectedDay: ''
    }

    componentDidMount() {
        let formDataNS = new FormData();    //formdata object
        formDataNS.append('city', localStorage.getItem('selectedcity'));   //append the values with key, value pair
        formDataNS.append('mid', this.state.amcode);
        formDataNS.append('lat', this.state.lat);
        formDataNS.append('lng', this.state.lng);
        formDataNS.append('date', this.state.date);
        // formDataNS.append('date', '2020-12-09');
        formDataNS.append('userid', localStorage.getItem('userid'));
        formDataNS.append('lang', this.state.lang);
        formDataNS.append('format', this.state.format);
        formDataNS.append('price', this.state.price);
        formDataNS.append('time', this.state.time);
        formDataNS.append('cinetype', this.state.cinetype);
        formDataNS.append('special', this.state.special);
        formDataNS.append('hc', this.state.date);
        formDataNS.append('av', Constants.av);
        formDataNS.append('pt', Constants.pt);
        formDataNS.append('did', Constants.did);

        const movieSessionRequest = async () => {
            try {
                this.setState(
                    {
                        loading: 1
                    }
                );
                // const resp = 
                await axios.post(Constants.api + 'content/msessionsnewfilters', formDataNS).then(resp => {
                    //  casetype array   
                    if (resp.data.result === 'success') {
                        this.setState(
                            {
                                loading: 0
                            }
                        );
                        console.log(resp.data.output);
                        this.setState({
                            output: resp.data.output
                        })
                        let lngsArray = []
                        Object.keys(resp.data.output.lngs).forEach(function (key) {
                            lngsArray.push(resp.data.output.lngs[key])
                        });

                        let daysArray = []
                        Object.keys(resp.data.output.dys).forEach(function (key) {
                            daysArray.push(resp.data.output.dys[key])
                        });

                        let sDay = '';
                        let sD = '';
                        Object.keys(daysArray).forEach(function (item, index) {
                            if (index == 0) {
                                console.log(daysArray[index].wd);
                                sDay = daysArray[index].wd;
                                sD = daysArray[index].d;
                                return;
                            }
                        });

                        let cinemasArray = []
                        Object.keys(resp.data.output.cinemas).forEach(function (key) {
                            cinemasArray.push(resp.data.output.cinemas[key])
                        });

                        this.setState({
                            lngs: lngsArray,
                            cinemas: cinemasArray,
                            days: daysArray,
                            selectedDay: sDay,
                            selectedDate: sD
                        })
                    } else {
                        console.log(resp.data.msg);
                        alert(resp.data.msg);
                        this.setState(
                            {
                                loading: 0
                            }
                        )
                    }
                    //movie array


                });

            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };
        movieSessionRequest();

    }
    


    render() {

const selectDate = (dateSelected, daySelected, ddSelected) => {
    let formDataDS = new FormData();    //formdata object
    formDataDS.append('city', localStorage.getItem('selectedcity'));   //append the values with key, value pair
    formDataDS.append('mid', this.state.amcode);
    formDataDS.append('lat', this.state.lat);
    formDataDS.append('lng', this.state.lng);
    formDataDS.append('date', dateSelected);
    // formDataDS.append('date', '2020-12-09');
    formDataDS.append('userid', localStorage.getItem('userid'));
    formDataDS.append('lang', this.state.lang);
    formDataDS.append('format', this.state.format);
    formDataDS.append('price', this.state.price);
    formDataDS.append('time', this.state.time);
    formDataDS.append('cinetype', this.state.cinetype);
    formDataDS.append('special', this.state.special);
    formDataDS.append('hc', this.state.date);
    formDataDS.append('av', Constants.av);
    formDataDS.append('pt', Constants.pt);
    formDataDS.append('did', Constants.did);
    try {
    this.setState(
        {
            loading: 1
        }
    );
    // const resp = 
    axios.post(Constants.api + 'content/msessionsnewfilters/', formDataDS).then(resp => {
        //  casetype array   
        if (resp.data.result === 'success') {
            this.setState(
                {
                    loading: 0
                }
            );
            console.log(resp.data.output);
            let cinemasArray = []
            Object.keys(resp.data.output.cinemas).forEach(function (key) {
                cinemasArray.push(resp.data.output.cinemas[key])
            });
    
            this.setState({
                cinemas: cinemasArray
            })
    
            console.log(this.state.cinemas);
            var element = document.getElementById('otherDateFilter');
            element.classList.remove("active");
            // var element = document.getElementById('otherDateFilter');
            // element.classList.remove("active");
            this.setState({ selectedDay: daySelected });
            this.setState({ selectedDate: ddSelected });
    
        } else {
            console.log(resp.data.msg);
            alert(resp.data.msg);
            this.setState(
                {
                    loading: 0
                }
            )
        }
        //movie array
    });
    
    } catch (err) {
    // Handle Error Here
    console.error(err);
    }
    }
    var seld = this.state.selectedDate;
   
    const daysRender2 = this.state.days.filter((item,idx) => idx < 7).map(function (item, i) {
        var id= "otherDateFilter";
     
        if(seld == item.d)
        var c = "btn btn-week active";
        else
        var c = "btn btn-week";
        return (
        <>
            <button className={c} id={id} onClick={() => selectDate(item.dt, item.wd, item.d)}>{item.wd} <br />{item.d}</button>
        </>
        );
        });

        const outputs = this.state.output;
        console.log(outputs);
        console.log(this.state.selectedDate);
        console.log(this.state.selectedDay);
        // console.log(JSON.stringify(days));

       
        const cinemaRender = this.state.cinemas.map(function (mcinema, i) {
            // '/seatlayout/' + mcinema.cn.toString().toLowerCase().replaceAll(' ', '-') + '/' + this.state.mname + '?mcode=' + show.mc
            ///seatlayout/pvr-sapphire-pacific-d21-dwarka/suraj-pe-mangal-bhari?mcode=HO00017429&sessionid=756&cinemacode=PASA&screenId=5&bundleAllowed=true
            return (
                <>
                    <div class="cinema-holder" key={i}>
                        {
                            mcinema.childs.map((cinema, j) => {
                                return (
                                    <>
                                        {/* {cinema.ccid} */}
                                        {
                                            cinema.sws.map((sws, k) => {
                                                return (
                                                    <>
                                                        <ul class="type-time-slots">
                                                            {
                                                                sws.s.map((show, l) => {
                                                                    let showClass = 'slot ';
                                                                    if (show.ss == 1) {
                                                                        showClass += 'text-success';
                                                                    } else if (show.ss == 2) {
                                                                        showClass += 'text-warning';
                                                                    } else if (show.ss == 3) {
                                                                        showClass += 'text-danger';
                                                                    } else {
                                                                        showClass += 'text-default';
                                                                    }
                                                                    return (
                                                                        <>
                                                                            {/* <span class="popover-holder pricing-popover full-width" placement="top">
                                                                                    <div role="popover" class="popover fade">
                                                                                        <div class="virtual-area" hidden=""></div>
                                                                                        <div class="arrow"></div>
                                                                                        <h3 class="popover-title" hidden=""></h3>
                                                                                        <div class="popover-content">
                                                                                            <div class=""></div>
                                                                                        </div>
                                                                                    </div>
                                                                                </span> */}
                                                                            <li>
                                                                                {(show.ss == 0 || show.ss == 3) ?
                                                                                    <a disabled='disabled' class={showClass}>{show.st}</a>
                                                                                    : <a href={'/seatlayout/' + mcinema.cn.toString().toLowerCase().replaceAll(' ', '-') + '/movie?mcode=' + show.mc + '&sessionid=' + show.sid + '&cinemacode=' + cinema.ccid + '&screenId=' + show.sn + '&bundleAllowed=false'} class={showClass}>{show.st}</a>
                                                                                }
                                                                            </li>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </ul>

                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }

                    </div>

                </>
            );
        });

        const dateHover = () => {
            var element = document.getElementById('otherDateFilter');
            element.classList.add("active");
        }

        return (
            <>
                <div className="booking">
                    <div className="booking-upper"  /*style={{backgroundImage: `url(${this.state.output.mih})`}} */>
                        {
                            <MovieDetails {...outputs} />
                        }
                        <div className="current-week">
                            {/* <DisplayWeek sdate={this.state.selectedDate} sday={this.state.selectedDay}/> */}
                            <div className="display-week">
                                <div className="filling-data">
                                    {daysRender2}
                                </div>
                                <div className="filling-details">
                                    <p>AVAILABLE</p>
                                    <p>FILLING FAST</p>
                                    <p>SOLD OUT</p>
                                    <p>LAPSED</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-lower">
                        <div className="movie-info">
                            <h4>movie info</h4>
                            {
                                <MovieInfoDetails {...outputs} />
                            }
                        </div>
                        
                        { (this.state.loading == 1) ?<Loading/>:<div className="showtimes">
                            <Tabs defaultActiveKey="showtimes" id="uncontrolled-tab-example">
                                <Tab eventKey="showtimes" title="showtimes" tabClassName="booking-time">
                                    {cinemaRender}
                                </Tab>
                                <Tab eventKey="synopsis" title="synopsis" tabClassName="booking-time">
                                    <h4>soon</h4>
                                </Tab>
                            </Tabs>
                        </div>
        }
                    </div>
                </div>
                {/* <Header />  */}


                {/* <Footer /> */}
                {/* <Modal show={this.state.setShow} animation={false}>
    <Modal.Header closeButton onClick={closetrailer}>
        <Modal.Title>{this.state.movietitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <><iframe width="100%" height="400"
            src={this.state.videoUrl}>
        </iframe></>
    </Modal.Body>
    <Modal.Footer>
        {/* <img src={require('../assets/logo1.png').default} alt="" width="200" /> */}
                {/* </Modal.Footer> */}

                {/* </Modal> */}
            </>
        );
    }
}

export default MovieSession;
