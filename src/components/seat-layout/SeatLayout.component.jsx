import React, { Component } from 'react';

import * as Constants from '../../Constants/index';
import './SeatLayout.style.css';
import axios from "axios";
import * as QueryString from "query-string";
import swal from 'sweetalert';
import MovieDetails from '../movie-details/MovieDetails.component';


class SeatLayout extends Component {

    constructor(props) {
        super(props);
        // this.otpvalidator = new SimpleReactValidator();
        // this.forgotvalidator = new SimpleReactValidator();
        // this.resetvalidator = new SimpleReactValidator();
        // this.resetpassvalidator = new SimpleReactValidator();
        // this.otploginvalidator = new SimpleReactValidator();
        // this.registervalidator = new SimpleReactValidator();
        // this.validator = new SimpleReactValidator();

    }

    state = {
        cinemaname: this.props.match.params.cinemaname,
        moviename: this.props.match.params.moviename,
        mcode: QueryString.parse(this.props.location.search).mcode,
        ccode: QueryString.parse(this.props.location.search).cinemacode,
        sessionid: QueryString.parse(this.props.location.search).sessionid,
        screenId: QueryString.parse(this.props.location.search).screenId,
        rows: [],
        output: {},
        showNextButton: 0,
        loading:1,
        selectedSeats: [],
        ticketPrice: 0,
        prices: [],
        ticketCount: 0,
        transOutput: {},
        seatsToSet:[],
        reserveOutput:{}
    }


    reserveData={
        transid:'',
        cinemacode:'',
        sessionid:'',
        seats:[]
    }

    componentDidMount() {
        let formDataNS = new FormData();    //formdata object
        formDataNS.append('city', localStorage.getItem('selectedcity'));   //append the values with key, value pair
        formDataNS.append('mid', this.state.mcode);
        formDataNS.append('lat', this.state.lat);
        formDataNS.append('lng', this.state.lng);
        formDataNS.append('date', this.state.date);
        formDataNS.append('userid', localStorage.getItem('userid'));
        formDataNS.append('av', Constants.av);
        formDataNS.append('pt', Constants.pt);
        formDataNS.append('did', Constants.did);
        
        const movieSessionRequest = async () => {
            try {
                console.log(this.state.moviename);
                console.log(this.state.mcode);
                this.setState(
                    {
                        loading: 1
                    }
                );
                // const resp = 
                await axios.post(Constants.api + 'trans/getseatlayoutnew/' + this.state.ccode + '/' + this.state.sessionid, formDataNS).then(resp => {
                    //  casetype array   
                    if (resp.data.result === 'success') {
                        this.setState(
                            {
                                loading: 0
                            }
                        );
                        console.log(resp.data.output);
                        console.log(this.state.mname);
                        console.log(this.state.mcode);
                        this.setState({
                            output: resp.data.output
                        })

                        let rowsArray = []
                        Object.keys(resp.data.output.rows).forEach(function (key) {
                            rowsArray.push(resp.data.output.rows[key])
                        });

                        let priceArray = []
                        Object.keys(resp.data.output.priceList).forEach(function (key) {
                            priceArray.push(resp.data.output.priceList[key])
                        });
                        // const AT = resp.data.output.et.toInt() * 60 * 1000 - (resp.data.output.at.toInt() * 60 * 1000);
                        // const ET = resp.data.output.at.toInt() * 60 * 1000;
                        localStorage.setItem('ccode', resp.data.output.cinemaCode);
                        localStorage.setItem('mcode', this.state.mcode);
                        localStorage.setItem('mname', this.state.output.mn);
                        localStorage.setItem('cname',resp.data.output.cn);
                        localStorage.setItem('showDate',this.state.output.st);

                        this.setState({
                            rows: rowsArray,
                            prices: priceArray
                        })
                        console.log(this.state.prices)
                    } else {
                        console.log(resp.data.msg);
                        swal(resp.data.msg);
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
    
    setSeats = () => {
        let formDataInitTrans = new FormData();
        formDataInitTrans.append('screenid', this.state.screenId);
        formDataInitTrans.append('av', Constants.av);
        formDataInitTrans.append('pt', Constants.pt);
        formDataInitTrans.append('did', Constants.did);
        try {
            this.setState(
                {
                    loading: 1
                }
            );
            // const resp = 
            axios.post(Constants.api + '/trans/initTrans/' + this.state.ccode + '/' + this.state.sessionid, formDataInitTrans).then(resp => {
                //  casetype array   
                if (resp.data.result === 'success') {
                    this.setState(
                        {
                            loading: 0
                        }
                    );
                    console.log(resp.data.output);
                    this.setState({
                        transOutput: resp.data.output
                    })
                    localStorage.setItem('transid', this.state.transOutput.transid);
                //   Reserve Seats Request
                    {
                        this.reserveData.transid=this.state.transOutput.transid;
                        this.reserveData.cinemacode=this.state.ccode;
                        this.reserveData.sessionid=this.state.sessionid;
                        this.reserveData.seats = this.state.seatsToSet;

                        let formDataReserveSeats = new FormData();
                        console.log(this.reserveData);
                        formDataReserveSeats.append('reserve', JSON.stringify(this.reserveData));
                        formDataReserveSeats.append('av', Constants.av);
                        formDataReserveSeats.append('pt', Constants.pt);
                        formDataReserveSeats.append('did', Constants.did);
                        try {
                            this.setState(
                                {
                                    loading: 1
                                }
                            );
                            axios.post(Constants.api + '/trans/reserveseats/', formDataReserveSeats).then(resp => {
                                if (resp.data.result === 'success') {
                                    this.setState(
                                        {
                                            loading: 0
                                        }
                                    );
                                    console.log(resp.data.output);
                                    this.setState({
                                        reserveOutput: resp.data.output
                                    })
                                    localStorage.setItem('bookingid', this.state.reserveOutput.bookingid);
                                   if(resp.data.output.fc == 'true')
                                    window.location= '/food/'+this.state.cinemaname+'/'+this.state.moviename;
                                    else{
                                        if (localStorage.userid == 0) {
                    
                                            this.setState({ "showlogin": 1 });
                                        }
                                        else
                                            window.location = '/payment/' + this.state.cinemaname + '/' + this.state.moviename;
                    
                                    } 

                                } else {
                                    console.log(resp.data.msg);
                                    swal(resp.data.msg);
                                    this.setState(
                                        {
                                            loading: 0,
                                            selectedSeats:[],

                                        }
                                        
                                    )
                                    setTimeout(function(){ window.location.reload(); }, 1500);
                                }
                            });

                        } catch (err) {
                            console.error(err);
                        }
                    }

                } else {
                    console.log(resp.data.msg);
                    swal(resp.data.msg);
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

    // render() {

    //     if (this.state.loading == 1) {
    //         return (
    //             <>
    //                 <Loading />
    //             </>
    //         )
    //     }
    // }    
    render() {

        const seatLayoutRender = this.state.rows.map(function (item, i) {
            if (item.t == 'area') {
                return (
                    <>
                        <React.Fragment key={i}>
                            <div class="seats-row">
                                <div class="seats-col _class_lable">
                                    <span class="seats__area">{item.n}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    </>
                )
            }
            if (item.t == 'seats') {
                return (
                    <>
                        <React.Fragment key={i}>
                            <div class="seats-row">
                                <div class="seats-col">
                                    <span class="seat-row-no">{item.n}</span>
                                </div>
                                {
                                    item.s.map((seat, j) => {
                                        if (seat.s == 0) {
                                            return (
                                                <div class="seats-col">
                                                    <span class="seat _hide">{seat.displaynumber}</span>
                                                </div>
                                            )
                                        } else if (seat.s == 1) {
                                            return (
                                                <div class="seats-col">
                                                    {/* <span id={seat.b} class="seat current">{seat.displaynumber}</span> */}
                                                    <span id={seat.b} className="seat current" onClick={() => selectSeat(seat.b, seat.sn, seat.c)}>
                                                        {/* <img src={require('../../assets/hollowseat.png').default} /> */}
                                                    </span>
                                                </div>
                                            )
                                        }
                                        else if (seat.s == 2) {
                                            return (
                                                <div class="seats-col">
                                                    <span class="seat disable current">{seat.displaynumber}</span>
                                                </div>
                                            )
                                        }
                                    })
                                }


                                {/* <div class="seats-col">
                                                <span class="seat current"></span>
                                            </div> */}


                                {/* <div class="seats-col">
                                    <span class="seat selected"></span>
                                </div> */}

                                {/* <div class="seats-col">
                                    <span class="seat _hide"></span>
                                </div> */}

                                {/* <div class="seats-col">
                                    <span class="seat"></span>
                                </div> */}

                            </div>
                        </React.Fragment>
                    </>
                )
            }
        });
        const selectSeat = (seatValue, seatNumber, areaNumber) => {
            if(this.state.ticketCount==10){
                this.setState({ showNextButton: 1 });
                let tctPrice = this.state.ticketPrice;
                console.log(areaNumber);
                let areaPrice = this.state.output.priceList[areaNumber];
                console.log(areaPrice);
                let tckCount = this.state.ticketCount;
    
                var element = document.getElementById(seatValue);
                let selectedSeatsArray = this.state.selectedSeats;
                if (selectedSeatsArray.includes(seatNumber) === true) {
                    var index = selectedSeatsArray.indexOf(seatNumber)
                    if (index !== -1) {
                        element.classList.remove("selected");
                        tctPrice -= parseFloat(areaPrice.price);
                        this.setState({ ticketPrice: tctPrice });
                        tckCount--;
                        this.setState({ ticketCount: tckCount });
                        
                        selectedSeatsArray.splice(index, 1);
                        this.state.seatsToSet.splice(index,1);
                        if (selectedSeatsArray.length == 0) {
                            this.setState({ showNextButton: 0 });
                        }
                    }
                }
                swal('You can only book 10 tickets at a time.');
                return;
            }
            this.setState({ showNextButton: 1 });
            let tctPrice = this.state.ticketPrice;
            console.log(areaNumber);
            let areaPrice = this.state.output.priceList[areaNumber];
            console.log(areaPrice);
            let tckCount = this.state.ticketCount;

            var element = document.getElementById(seatValue);
            let selectedSeatsArray = this.state.selectedSeats;
            if (selectedSeatsArray.includes(seatNumber) === true) {
                var index = selectedSeatsArray.indexOf(seatNumber)
                if (index !== -1) {
                    element.classList.remove("selected");
                    tctPrice -= parseFloat(areaPrice.price);
                    this.setState({ ticketPrice: tctPrice });
                    tckCount--;
                    this.setState({ ticketCount: tckCount });
                    
                    selectedSeatsArray.splice(index, 1);
                    this.state.seatsToSet.splice(index,1);
                    if (selectedSeatsArray.length == 0) {
                        this.setState({ showNextButton: 0 });
                    }
                }
            } else {
                tctPrice += parseFloat(areaPrice.price);
                this.setState({ ticketPrice: tctPrice });
                tckCount++;
                this.setState({ ticketCount: tckCount });
                element.classList.add("selected");
                selectedSeatsArray.push(seatNumber);
                let seatObj = {};
                seatObj.priceCode=areaPrice.priceCode;
                seatObj.seatBookingId=seatValue;
                this.state.seatsToSet.push(seatObj);
            }

            this.setState({
                selectedSeats: selectedSeatsArray
            })

            console.log(this.state.selectedSeats);
        }

        const selectSeatRender = this.state.selectedSeats.map(function (item, i) {
            return (
                <>
                    <React.Fragment key={i}>
                        <li>{item}</li>
                    </React.Fragment>
                </>
            )
        });

        const backButtonClicked = () => {
            this.props.history.goBack();
        }

        return (
            <>
            <div className="booking">
                <div className="booking-upper"  /*style={{backgroundImage: `url(${this.state.output.mih})`}} */>
                    {   
                        // <MovieDetails {...output}/>
                        <MovieDetails nm = {this.state.output.mn} miv = {this.state.output.im}/>

                    }
                </div>
                <div className="booking-lower">
                    <div className="summary-display">
                        <div class="sticky-right summary-sticky" >
                            <div class="booking_summary _35px">
                                <h3 class="_summary_txt">Booking Summary</h3>
                                {/* <img class="img-responsive" src={this.state.output.imh} alt="" /> */}
                                <div class="_summary_details _border__">
                                    {/* <div class="_item_list">
                                        <p class="_name__">Movie</p>
                                        <h4 class="movie_name__">{this.state.output.mn}</h4>
                                    </div> */}
                                    <div class="_item_list">
                                        <p class="_name__">Location</p>
                                        <h4 class="movie_name__">{this.state.output.cn}</h4>
                                    </div>
                                    <div class="_item_list">
                                        <p class="_name__">Date</p>
                                        <h4 class="movie_name__">{this.state.output.st}</h4>
                                    </div>
                                    <div class="_item_list">
                                        <div className="seat-selected">
                                            {
                                                this.state.selectedSeats.map(items => {
                                                    return(
                                                        <div className="square-seat">{items}</div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="total-amount _item_list">
                                    <span class="_name__">Total amount</span>
                                    <span class="amount-value">{this.state.ticketPrice}  OVR</span>
                                </div>
                                <div className="booking-button _item_list">
                                    <button class="_btn btn-back"  onClick={backButtonClicked}>Back</button>
                    {(this.state.showNextButton == 1) ?
                                    
                                    <button class="_btn btn-next" onClick={this.setSeats}>Next</button>:
                                    ''}
                                </div>
                            </div>
                        </div>        
                    </div>
                    <div className="seats-info">
                    <div className="seats-display">
                        <div className="seat-type cinema-labels cl-left">
                            <div class="box box-available">
                                <img src={require('../../assets/hollowseat.png').default} />
                                NORMAL
                            </div>
                            <div class="box box-available">
                                <img src={require('../../assets/delux.png').default} />
                                DELUX
                            </div>
                        </div>
                        <div class="cinema-labels cl-right" >
                            <div class="box box-unavailable">
                                <img src={require('../../assets/filledseat.png').default} />
                                SOLD
                            </div>
                            <div class="box box-available">
                                <img src={require('../../assets/hollowseat.png').default} />
                                AVAILABLE
                            </div>
                            <div class="box box-selected">
                                <img src={require('../../assets/selectseat.png').default} />
                                SELECTED
                            </div>
                        </div>
                    </div>
                    <div class="scree_way">
                        <img src={require('../../assets/screen.png').default} />
                        <p>screen this way</p>
                    </div>
                    <div className="seats-preview">
                        {seatLayoutRender}   
                    </div>
                    </div>
                </div>
        </div>                                
                
                            {/* <div class="bottom_sticky">
                    <button class="btn btn_outline btn_text"><i class="fa fa-long-arrow-left" aria-hidden="true">&nbsp;&nbsp;</i>
            Back</button>
                    {(this.state.showNextButton == 1) ?
                        <button onClick={this.setSeats} class="btn btn_blue _float_right btn_text">Next &nbsp;&nbsp;<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </button>
                        : ''} */}
                {/* booking summary */} 
            
                
                                
                  {/* booking summary end */}        

                {/* <Footer /> */}
            </>
        );
    }
}

export default SeatLayout;
