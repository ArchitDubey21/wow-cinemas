import React, { Component } from 'react';
import * as Constants from '../../Constants/index';
import Loading from '../../Constants/Loading';

import axios from "axios";
import * as QueryString from "query-string";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import SimpleReactValidator from 'simple-react-validator';
import "./food.css";
import foodimage from '../../assets/food_image.jpg';


class Food extends Component {

    constructor(props) {
        super(props);
        this.otpvalidator = new SimpleReactValidator();
        this.forgotvalidator = new SimpleReactValidator();
        this.resetvalidator = new SimpleReactValidator();
        this.resetpassvalidator = new SimpleReactValidator();
        this.otploginvalidator = new SimpleReactValidator();
        this.registervalidator = new SimpleReactValidator();
        this.validator = new SimpleReactValidator();
        this.getFoodRequest = this.getFoodRequest.bind(this);
        // this.handleClickActiveTab = this.handleClickActiveTab.bind(this);
     

    }

    state = {
        cinemaname: this.props.match.params.cinemaname,
        moviename: this.props.match.params.moviename,
        categories: [],
        foods: [],
        tckDetailsOutput: {},
        tckDetails: [],
        foodDetails: [],
        selectSeat: [],
        totalPrice: 0,
        foodString: '',
        
        onlyVeg: false
    }

    // handleClickActiveTab=(e)=> {
    //     alert(e);
    //     // const newActiveTab = e.target.tab;
    //     // this.setState({
    //     //     activeTab: newActiveTab,
    //     // })
    // }

    componentDidMount() {
        let formDataFood = new FormData();    //formdata object
        formDataFood.append('ccode', localStorage.getItem('ccode'));   //append the values with key, value pair
        formDataFood.append('bookingid', localStorage.getItem('bookingid'));
        formDataFood.append('cbookid', '');
        formDataFood.append('transid', localStorage.getItem('transid'));
        formDataFood.append('type', '');
        formDataFood.append('audi', '');
        formDataFood.append('seat', '');
        formDataFood.append('av', Constants.av);
        formDataFood.append('pt', Constants.pt);
        formDataFood.append('did', Constants.did);
        this.getFoodRequest()

        //getFoodRequest();

        let formDataTckDetails = new FormData();    //formdata object
        formDataTckDetails.append('cinemacode', localStorage.getItem('ccode'));   //append the values with key, value pair
        formDataTckDetails.append('bookingid', localStorage.getItem('bookingid'));
        formDataTckDetails.append('transid', localStorage.getItem('transid'));
        formDataTckDetails.append('doreq', false);
        formDataTckDetails.append('userid', localStorage.getItem('userid'));
        formDataTckDetails.append('av', Constants.av);
        formDataTckDetails.append('pt', Constants.pt);
        formDataTckDetails.append('did', Constants.did);

        const tckDetailsRequest = async () => {
            try {
                console.log(this.state.moviename);
                console.log(this.state.mcode);
                // const resp = 
                await axios.post(Constants.api + '/trans/tckdetails/', formDataTckDetails).then(resp => {
                    //  casetype array   
                    if (resp.data.result === 'success') {
                        this.setState(
                            {
                                loading: 0
                            }
                        );
                        // console.log(resp.data.output.seat);
                        this.setState({
                            tckDetailsOutput: resp.data.output,
                            selectSeat: resp.data.output.seat,
                        })

                        let tckDetailsArray = []
                        Object.keys(resp.data.output.f).forEach(function (key) {
                            tckDetailsArray.push(resp.data.output.f[key])
                        });

                        this.setState({
                            tckDetails: tckDetailsArray,
                            totalPrice: resp.data.output.a
                        })




                    } else {
                        //   console.log(resp.data.msg);
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

        tckDetailsRequest();

    }

    async getFoodRequest(onlyVeg = false) {
        console.log("testing -------->");
        let formDataFood = new FormData();    //formdata object
        formDataFood.append('ccode', localStorage.getItem('ccode'));   //append the values with key, value pair
        formDataFood.append('bookingid', localStorage.getItem('bookingid'));
        formDataFood.append('cbookid', '');
        formDataFood.append('transid', localStorage.getItem('transid'));
        formDataFood.append('type', '');
        formDataFood.append('audi', '');
        formDataFood.append('seat', '');
        formDataFood.append('av', Constants.av);
        formDataFood.append('pt', Constants.pt);
        formDataFood.append('did', Constants.did);
        try {
            // console.log(this.state.moviename);
            //console.log(this.state.mcode);
            // const resp = 
            //console.log(this.formDataFood);
            await axios.post(Constants.api + '/food/getfoods/', formDataFood).then(resp => {
                //  casetype array   
                if (resp.data.result === 'success') {
                    this.setState(
                        {
                            loading: 0
                        }
                    );
                    //console.log(resp.data.output);
                    this.setState({
                        output: resp.data.output
                    })

                    let categoryArray = []
                    Object.keys(resp.data.output.cat).forEach(function (key) {
                        categoryArray.push(resp.data.output.cat[key])
                    });

                    let foodsArray = []
                    Object.keys(resp.data.output.r).forEach(function (key) {
                        console.log(resp.data.output.r[key].id);
                        if (onlyVeg) {
                            if (resp.data.output.r[key].veg == true) {

                                console.log("Only Veg---->");
                                foodsArray.push(resp.data.output.r[key]);
                            }
                        } else {
                            foodsArray.push(resp.data.output.r[key]);
                        }

                    });

                    //  console.log(foodsArray);

                    this.setState({
                        foods: foodsArray,
                        categories: categoryArray
                    })

                } else {
                    //console.log(resp.data.msg);
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
    resendOtp = () => {
        try {

            let resendData = new FormData();    //formdata object

            resendData.append('pt', Constants.pt);
            resendData.append('mobile', this.state.mobile);

            // const resp = 
            axios.post(Constants.api + '/user/new/resendotp', resendData).then(resp => {
                //  casetype array   
                console.log(resp);
                if (resp.data.result === 'success') {

                    swal("", "OTP has been resent on your Mobile Number.", "success");

                } else {

                    swal(resp.data.msg);
                }



            });

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    setFood = () => {
        try {
            console.log(this.state.moviename);
            console.log(this.state.mcode);
            // const resp = 
            let formDataFoodDetails = new FormData();
            formDataFoodDetails.append('av', Constants.av);
            formDataFoodDetails.append('pt', Constants.pt);
            formDataFoodDetails.append('did', Constants.did);
            formDataFoodDetails.append('transid', localStorage.getItem('transid'));
            formDataFoodDetails.append('cinemacode', localStorage.getItem('ccode'));
            formDataFoodDetails.append('foods', this.state.foodString);
            axios.post(Constants.api + '/trans/setfood', formDataFoodDetails).then(resp => {
                //  casetype array   
                if (resp.data.result === 'success') {
                    if (localStorage.userid == 0) {

                        this.setState({ "showlogin": 1 });
                    }
                    else
                        window.location = '/payment/' + localStorage.ccode + '/' + localStorage.mname;

                } else if (resp.data.result === 'dialog') {
                    swal("",resp.data.msg,"info");
                }


            });

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    skip = () => {
        try {

            if (localStorage.userid == 0) {

                this.setState({ "showlogin": 1 });
            }
            else
                window.location = '/payment/' + localStorage.ccode + '/' + localStorage.mname;

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };


    handleForgotpassSubmit = event => {

        event.preventDefault();
        if (this.forgotvalidator.allValid()) {
            let logindata = new FormData();    //logindata object
            logindata.append('pt', Constants.pt);
            logindata.append('av', Constants.av);
            logindata.append('did', Constants.did);
            logindata.append('mobile', this.state.mobile);
            logindata.append('email', '');

            axios.post(Constants.api + '/user/forgotpassword', logindata)
                .then(res => {
                    console.log(res);
                    if (res.data.result == 'success') {
                        if (res.data.msg == 'ok') {
                            swal("Please Enter OTP Received on your Mobile Number.");
                            this.setState({ showforgotpass: 0, resetpassshow: 1 });
                        }
                    }
                    else {
                        // this.setState({alert:res.data.msg});
                        swal("",res.data.msg, "info");
                    }



                })
        }
        else
            this.forgotvalidator.showMessages();
        this.forceUpdate();
    }
    handleOtpLoginSubmit = event => {

        event.preventDefault();
        if (this.otploginvalidator.allValid()) {
            let logindata = new FormData();    //logindata object
            logindata.append('pt', Constants.pt);
            logindata.append('mobile', this.state.mobile);

            axios.post(Constants.api + '/user/new/resendotp', logindata)
                .then(res => {
                    console.log(res);
                    if (res.data.result == 'success') {
                        if (res.data.output.otp_require == 'true') {
                            this.setState({ showotplogin: 0, otpshow: 1 });
                        }
                    }
                    else {
                        // this.setState({alert:res.data.msg});
                        swal(res.data.msg);
                    }



                })
        }
        else
            this.otploginvalidator.showMessages();
        this.forceUpdate();
    }
    handleLoginSubmit = event => {

        event.preventDefault();
        if (this.validator.allValid()) {
            let logindata = new FormData();    //logindata object
            logindata.append('av', Constants.av);
            logindata.append('pt', Constants.pt);
            logindata.append('did', Constants.did);
            logindata.append('mobile', this.state.mobile);
            logindata.append('password', this.state.password);

            axios.post(Constants.api + '/user/new/login', logindata)
                .then(res => {
                    console.log(res);
                    if (res.data.result == 'success') {
                        swal("", "You Have Succesfully Logged In.", "success");
                        localStorage.setItem('useremail', res.data.output.em);
                        localStorage.setItem('userid', res.data.output.id);
                        localStorage.setItem('userphone', res.data.output.ph);
                        localStorage.setItem('username', res.data.output.un);

                        window.location = '/payment/' + localStorage.ccode + '/' + localStorage.mname;
                    }
                    else {
                        // this.setState({alert:res.data.msg});
                        swal(res.data.msg);
                    }



                })
        }
        else
            this.validator.showMessages();
        this.forceUpdate();
    }
    handleRegisterSubmit = event => {

        event.preventDefault();

        if (this.registervalidator.allValid()) {
            if (this.state.password != this.state.confirmpassword) {
                swal("", "Passwords do not match.", "info");
            }
            else {
                let registerdata = new FormData();    //registerdata object
                registerdata.append('av', Constants.av);
                registerdata.append('pt', Constants.pt);
                registerdata.append('did', Constants.did);
                registerdata.append('mobile', this.state.mobile);
                registerdata.append('password', this.state.password);
                registerdata.append('email', this.state.email);
                registerdata.append('name', this.state.name);

                axios.post(Constants.api + '/user/new/register', registerdata)
                    .then(res => {
                        console.log(res);
                        if (res.data.result == 'success') {
                            if (res.data.output.otp_require == 'true') {
                                swal("Please Enter OTP Received on your Mobile Number.")
                                this.setState({ showregister: 0, otpshow: 1 });
                            }

                        }
                        else {
                            // this.setState({alert:res.data.msg});
                            swal("", res.data.msg, "info");
                        }

                        // if (res.data.msg == 'Please enter otp')
                        // window.location = '/verifyotp';

                    })
            }

        }
        else
            this.registervalidator.showMessages();
        this.forceUpdate();
    }

    handleotpSubmit = event => {

        event.preventDefault();
        if (this.otpvalidator.allValid()) {

            let otpdata = new FormData();    //otpdata object
            otpdata.append('av', Constants.av);
            otpdata.append('pt', Constants.pt);
            otpdata.append('mobile', this.state.mobile);
            otpdata.append('otp', this.state.otp);
            otpdata.append('name', this.state.name);

            axios.post(Constants.api + '/user/verifyotp', otpdata)
                .then(res => {
                    console.log(res);
                    if (res.data.result == 'success') {

                        localStorage.setItem('useremail', res.data.output.em);
                        localStorage.setItem('userid', res.data.output.id);
                        localStorage.setItem('userphone', res.data.output.ph);
                        localStorage.setItem('username', res.data.output.un);
                        swal("", "You have logged in!", "success");

                        window.location = '/payment/' + localStorage.ccode + '/' + localStorage.mname;
                    }
                    else {
                        // this.setState({alert:res.data.msg});
                        swal("", res.data.msg, "info");
                    }

                    // if (res.data.msg == 'Please enter otp')
                    // window.location = '/verifyotp';

                })
        }
        else
            this.otpvalidator.showMessages();
        this.forceUpdate();
    }
    handleresetpassSubmit = event => {

        event.preventDefault();
        if (this.resetpassvalidator.allValid()) {
            if (this.state.password != this.state.confirmpassword) {
                swal("", "Passwords do not match.", "info");
            }
            else {
                let resetdata = new FormData();    // resetdata object
                resetdata.append('av', Constants.av);
                resetdata.append('pt', Constants.pt);
                resetdata.append('did', Constants.did);
                resetdata.append('mobile', this.state.mobile);
                resetdata.append('password', this.state.password);
                resetdata.append('authcode', this.state.otp);
                resetdata.append('email', '');

                axios.post(Constants.api + '/user/resetpassword', resetdata)
                    .then(res => {
                        console.log(res);
                        if (res.data.result == 'success') {

                            localStorage.setItem('useremail', res.data.output.em);
                            localStorage.setItem('userid', res.data.output.id);
                            localStorage.setItem('userphone', res.data.output.ph);
                            localStorage.setItem('username', res.data.output.un);
                            swal("", "You have logged in!", "success");

                            window.location = '/payment/' + localStorage.ccode + '/' + localStorage.mname;
                        }
                        else {
                            // this.setState({alert:res.data.msg});
                            swal("", res.data.msg, "info");
                        }

                        // if (res.data.msg == 'Please enter otp')
                        // window.location = '/verifyotp';

                    })
            }
        }
        else
            this.resetpassvalidator.showMessages();
        this.forceUpdate();
    }
    searchhandleChange = event => {
        this.setState({ search: event.target.value });

    }

    otphandleChange = event => {
        this.setState({ otp: event.target.value });

    }
    namehandleChange = event => {
        this.setState({ name: event.target.value });

    }
    emailhandleChange = event => {
        this.setState({ email: event.target.value });

    }
    mobilehandleChange = event => {
        this.setState({ mobile: event.target.value });

    }
    passwordhandleChange = event => {
        this.setState({ password: event.target.value });
    }
    confirmpasswordhandleChange = event => {
        this.setState({ confirmpassword: event.target.value });
    }
    changeFoodType = event => {
        console.log(event.target.checked);
        if (event.target.checked == true) {
            this.getFoodRequest(true);
            this.setState({ onlyVeg: true });
        } else {
            this.setState({ onlyVeg: false });
            this.getFoodRequest();
        }

    }
    cityChange = event => {
        this.setState({ 'selectedcity': event.target.value });
        localStorage.setItem('selectedcity', event.target.value);
        //   alert(localStorage.getItem('selectedcity'));
        window.location = '/';
    }
    registerClick = () => {
        this.setState({ 'showregister': 1, 'showlogin': 0 });
    }
    forgotpassClick = () => {
        this.setState({ 'showforgotpass': 1, 'showlogin': 0 });
    }
    loginClick = () => {

        this.setState({ 'showlogin': 1 });
    }
    loginotpClick = () => {

        this.setState({ 'showlogin': 0, 'showotplogin': 1 });
    }

    nameClick = () => {
        if (this.state.showMenu == 1)
            this.setState({ 'showMenu': 0 });
        else
            this.setState({ 'showMenu': 1 });
    }


    loginHide = () => {

        this.setState({ 'showlogin': 0 });
    }
    registerHide = () => {
        this.setState({ 'showregister': 0 });
    }
    forgotpassHide = () => {
        this.setState({ 'showforgotpass': 0 });
    }
    resetpassHide = () => {
        this.setState({ 'resetpassshow': 0 });
    }
    otploginHide = () => {
        this.setState({ 'showotplogin': 0 });
    }

    render() {
        const activeClass = this.state.activeTab;
        if (this.state.loading == 1) {
            return (
                <>
                    <Loading />
                </>
            )
        }

        let foodsArray = this.state.foods;
        const categoryRender = this.state.categories.filter(category => category != '').map(function (category, i) {
            // let actv =activeClass == i ? 'active' : '';
            return (
                <>
                    <React.Fragment key={i}>
                        <Tab ><button class="btn btn-gray">{category}</button></Tab>
                    </React.Fragment>
                </>
            )
        });
        const selectSeatRender = this.state.selectSeat.map(function (item, i) {
            return (
                <>
                    <React.Fragment key={i}>
                        <li class="square-seat">{item.n}</li>
                    </React.Fragment>
                </>
            )
        });
        const foodRenderAll = this.state.foods.map(function (food, i) {
            //console.log(food);
            return (
                <>
                    <React.Fragment key={i}>
                        {/* <h2>Any content </h2> */}


                        <div class="foods_box">
                            <div class="foods_img_box">
                                <img class="img-responsive" src={require('../../assets/Logo.png')} alt="" />
                            </div>
                            <div class="foods_txt_box">

                                <div class="_cont_box " hidden={food.veg != true}>
                                    <img class="img-responsive" src={require('../../assets/veg_icon.svg')} alt="" />
                                </div>

                                <div class="_cont_box">
                                    <h4 class="_food_name">{food.h}</h4>
                                </div>
                                <div>
                                    <div class="_cont_box">
                                        {/*  */}

                                        <button className={`btn btn_blue ${'add' + food.id}`} onClick={() => addFood(food, 1)}  >Add </button>
                                        <div className={`hide ${'remove' + food.id}`}>
                                            <i class="fa fa-minus _circle_round" aria-hidden="true" onClick={() => addFood(food, 1, 'dec')}></i>
                                            <span className={'qty' + food.id}></span>
                                            <i class="fa fa-plus _circle_round " aria-hidden="true" onClick={() => addFood(food, 1, 'inc')}></i>
                                        </div>


                                    </div>
                                    <div class="_cont_box _float_right ">
                                        <div class="p15px_">
                                            <i class="fa fa-inr __price_food"></i>
                                            <del class="__price_food"> {food.dp / 100}</del>
                                        </div>
                                        <div class="p15px_">
                                            <i class="fa fa-inr __price_food"></i>
                                            <span class="__price_food"> {food.dp / 100}</span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>



                    </React.Fragment>
                </>
            )
        });


        const addFood = (food, qty, type = '') => {
            let food_string = '';
            //   REGULAR POPCORN CHEESE (NEW)|100263|1|27000|HO00100263#FRENCH FRIES (NEW)|101328|1|18000|HO00101328
            let foodDetails = this.state.foodDetails;
            var before_price = 0;
            foodDetails.map((food) => before_price += (food.dp / 100) * food.qty);
            //console.log(foodDetails);
            var index = foodDetails.findIndex(obj => obj.id == food.id);

            if (index >= 0) {
                if (type == 'inc') {
                    if (foodDetails[index].qty == 10) {
                        swal("",'Max qtuantity 10 allowed per item',"info");
                        return false;
                    }
                    foodDetails[index].qty = foodDetails[index].qty + 1;
                    console.log(foodDetails[index].qty);
                } else {
                    if (foodDetails[index]['qty'] > 1) {
                        foodDetails[index]['qty'] = foodDetails[index]['qty'] - 1;
                    } else {
                        //foodDetails.splice(food.id, 1);
                        foodDetails.splice(index, 1);

                    }

                }
                this.setState({ foodDetails: foodDetails });


            } else {

                var fd = { "id": food.id, dp: food.dp, 'ho': food.ho, 'veg': food.veg, 'h': food.h, 'qty': 1 };
                foodDetails.push(fd);

                this.setState({ foodDetails: foodDetails });

            }
            console.log("Size of Food Details ----->" + foodDetails.length)
            console.log(foodDetails);

            let total_food_price = 0.0;
            foodDetails.map((food) => {
                total_food_price += (food.dp / 100) * food.qty;
                food_string += food_string != '' ? '#' : '';
                food_string += food.h + '|' + food.id + '|' + food.qty + '|' + food.dp + '|' + food.ho;
            });
            this.setState({ foodString: food_string });
            let total_price = Number(parseFloat(this.state.totalPrice) + parseFloat(total_food_price) - parseFloat(before_price)).toFixed(2);
            this.setState({ totalPrice: total_price });
            // End 

            //console.log(this.setState.foodDetails);
        }

        const foodRender2 = this.state.categories.map(function (category, i) {
            return (
                <>
                    <React.Fragment key={i}>
                        <TabPanel>
                            {
                                foodsArray.map((food, j) => {
                                    if (food.ct == category) {
                                        return (

                                            <div class="foods_box">
                                                <div class="foods_img_box">
                                                    {/* <img class="img-responsive" src={require('../assets/food_image.jpg').default} alt="" /> */}
                                                </div>
                                                <div class="foods_txt_box">
                                                    <div class="_cont_box ">
                                                        {/* <img class="img-responsive" src={require('../assets/veg_icon.svg').default} alt="" /> */}
                                                    </div>
                                                    <div class="_cont_box">
                                                        <h4 class="_food_name">{food.h}</h4>
                                                    </div>
                                                    <div>
                                                        <div class="_cont_box">
                                                            {/* <i class="fa fa-plus _circle_round food-count-hide" aria-hidden="true"></i>
                    <span class="_increase_number">ADD</span>
                    <i class="fa fa-minus _circle_round food-count-hide" aria-hidden="true"></i> */}

                                                            <button className={`btn btn_blue ${'add' + food.id}`} onClick={() => addFood(food, 1)}  >Add </button>
                                                            <div className={`hide ${'remove' + food.id}`}>
                                                                <i class="fa fa-minus _circle_round" aria-hidden="true" onClick={() => addFood(food, 1, 'dec')}></i>
                                                                <span className={'qty' + food.id}></span>
                                                                <i class="fa fa-plus _circle_round " aria-hidden="true" onClick={() => addFood(food, 1, 'inc')}></i>
                                                            </div>
                                                        </div>
                                                        <div class="_cont_box _float_right ">
                                                            <div class="p15px_">
                                                                <i class="fa fa-inr __price_food"></i>
                                                                <del class="__price_food"> {food.dp / 100}</del>
                                                            </div>
                                                            <div class="p15px_">
                                                                <i class="fa fa-inr __price_food"></i>
                                                                <span class="__price_food"> {food.dp / 100}</span>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                        )
                                    }
                                })
                            }
                        </TabPanel>
                    </React.Fragment>
                </>
            )
        });

        const tckDetailsRender = this.state.tckDetails.map(function (tck, i) {
            return (
                <>
                    <React.Fragment key={i}>
                        {
                            tck.it.map((det, j) => {
                                return (
                                    <li>
                                        <div class="_food_item_name">{det.n}</div>
                                        <div class="_food_item_name">{(det.n.startsWith('GST Number')) ? '' : 'INR'} {det.v}</div>
                                    </li>
                                )
                            })
                        }
                    </React.Fragment>
                </>
            )
        });

        const foodDetailsRender = this.state.foodDetails.map(function (food, i) {
            return (
                <>
                    <React.Fragment key={i}>
                        {
                            <li><div class="_food_item_name">{food.qty} x {food.h}</div><div class="_food_item_name">INR {Number(food.qty * food.dp / 100).toFixed(2)} </div></li>
                        }
                    </React.Fragment>
                </>
            )
        });

        const backButtonClicked = () => {
            this.props.history.goBack();
        }
        
        //const index = foodDetails.findIndex(obj => obj.id == food.id);
        const food_details = this.state.foodDetails;
        return (

            <>
            <div className="container food-section">
                <div className="row">
                 {/* booking summary  */}
                 <div class="movie-info">
                    <div class="booking_summary _35px">
                        <h3 class="_summary_txt">Booking Summary</h3>
                        {/* <img class="img-responsive" src={this.state.tckDetailsOutput.imh} alt="" /> */}
                        <div class="_summary_details _border__">
                            <div class="_item_list">
                                <p class="_name__">Movie</p>
                                <h4 class="movie_name__">{this.state.tckDetailsOutput.m} {this.state.tckDetailsOutput.cen} {this.state.tckDetailsOutput.lg}</h4>
                            </div>
                            <div class="_item_list">
                                <p class="_name__">Location</p>
                                <h4 class="movie_name__">{this.state.tckDetailsOutput.c}</h4>
                            </div>

                            <div class="_item_list">
                                <p class="_name__">Date</p>
                                <h4 class="movie_name__"> {this.state.tckDetailsOutput.md}</h4>
                            </div>

                            <div class="_item_list">
                                <p class="_name__">Time</p>
                                <h4 class="movie_name__">{this.state.tckDetailsOutput.t}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="ticket_prints _35px">
                        <span class="_name__">Seat Info</span>
                        <span class="_info__ _float_right">
                            {/* <img src={require('../assets/information.png').default} /> */}
                        </span>
                        <div class="_print_tickets">
                            <ul>
                                {selectSeatRender}
                            </ul>
                        </div>
                    </div>
                    <div class="foods_details_with_coupon">
                        <ul class="food_list_selected_">
                            {tckDetailsRender}
                            {foodDetailsRender}
                        </ul>
                    </div>
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                    <div class="total-amount _item_list">
                        <span class="_name__">Total Amount</span>
                            <span class="amount-value">{this.state.totalPrice} OMR</span>

                    </div>
                    <div class="booking-button _item_list"><button class="_btn btn-back">Back</button><button class="_btn btn-next">Next</button></div>
                </div>

                {/* booking summary end */}

                {/* <div class="bottom_sticky">
                    <button onClick={backButtonClicked} class="btn btn_outline btn_text"><i class="fa fa-long-arrow-left" aria-hidden="true">&nbsp;&nbsp;</i>
Back</button>
                    {this.state.foodDetails.length > 0 ? (
                        <button onClick={this.setFood} class="btn btn_blue _float_right btn_text">Next &nbsp;&nbsp;<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </button>) : ('')
                    }
            
                </div> */}
                {/* <Header /> */}

                <div class="showtimes foodcontainer">
                <div class="row food-heading">
            <div class="heading-content">
                <h3>
                    Food & Beverages
                </h3>
                <button class="btn btn-ghost" onClick={this.skip}>SKIP</button>
            </div>
        </div>
                    <div class="row food-type">
                        <div class="btn-preview-collection">
                            <div class="food-btn-group">
                                <TabList>
                                    <Tab><button class="btn btn-default"><a>All</a></button></Tab>
                                    {categoryRender}
                                </TabList>
                            </div>
                            <div class="food-switch">
                                <label for="switch">Only Veg</label>
                                <label class="switch">
                                    <input type="checkbox" onChange={this.changeFoodType} />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                            <div class="col-sm-12 col-xs-12">
                                <Tabs>
                                    <div class="seat__title">
                                        {/* <h3 class="_foods_title">Food & Beverage</h3> */}
                                        <div class="_box_title">
                                            <div class="tab_list_movies">
                                           
                                            </div>
                                        </div>
                                     
                                        
                                    </div>

                                    <div class="tab-content _50px">

                                        <TabPanel>
                                    <div className="food-preview-collection">
                                            {this.state.foods.map((food, i) => (
                                                <div class="food-preview">
                                                <div class="food-img">
                                                    <img src={foodimage}alt="" />
                                                    <p>{food.h}</p>
                                                </div>
                                                {/* <p class="order-info">
                                                    (1 small coke 350ml + 1 large nachos 80gm)
                                                </p> */}
                                                <div class="row">
                                                    <p class="total-rate">{food.dp / 100} OMR  </p>
                                                    <div class="food-counter-btn">
                                                    <i class="fa fa-plus _circle_round food-count-hide" onClick={() => addFood(food, 1, 'inc')}aria-hidden="true"></i> 
                                                        <p class="food-count"> 
                                                        {(food_details[food_details.findIndex(obj => obj.id == food.id)] !==undefined)?food_details[food_details.findIndex(obj => obj.id == food.id)].qty:0}
                                                        </p>
                                                        <i class="fa fa-minus _circle_round food-count-hide" onClick={() => addFood(food, 1, 'dec')}aria-hidden="true"></i> 
                                                    </div>
                                                </div>
                                                </div>

                                                // <div class="foods_box">
                                                //     <div class="foods_img_box">
                                                //         <img class="img-responsive" src={(food.iw!= null)?food.iw:"../../assets/food_image.jpg"} alt="" />
                                                //     </div>
                                                //     <div class="foods_txt_box">
                                                //         {food.veg == true ?
                                                //             <div class="_cont_box " >
                                                //                 <img class="img-responsive" src={require('../../assets/veg_icon.svg').default} alt="" /> 
                                                //             </div>
                                                //             : null}
                                                //         <div class="_cont_box">
                                                //             <h4 class="_food_name">{food.h}</h4>
                                                //         </div>
                                                //         <div>
                                                //             <div class="_cont_box">
                                                //                 {/*  */}
                                                //                 {food_details.findIndex(obj => obj.id == food.id) >= 0 ? (
                                                //                     <div className={`${'remove' + food.id}`}>
                                                //                         <i class="fa fa-minus _circle_round" aria-hidden="true" onClick={() => addFood(food, 1, 'dec')}></i>
                                                //                         <span className={'qty' + food.id}>{food_details[food_details.findIndex(obj => obj.id == food.id)].qty}</span>
                                                //                         <i class="fa fa-plus _circle_round " aria-hidden="true" onClick={() => addFood(food, 1, 'inc')}></i>
                                                //                     </div>
                                                //                 ) : (
                                                //                         <button className={`btn btn_blue ${'add' + food.id}`} onClick={() => addFood(food, 1)}  >Add </button>
                                                //                     )
                                                //                 }


                                                //             </div>
                                                //             <div class="_cont_box _float_right ">

                                                //                 <div class="p15px_">
                                                //                     {(food.op != 0) ? <><i class="fa fa-inr __price_food"></i>
                                                //                         <del class="__price_food"> {food.op / 100}</del></> : ''}
                                                //                 </div>
                                                //                 <div class="p15px_">
                                                //                     <i class="fa fa-inr __price_food"></i>
                                                //                     <span class="__price_food"> {food.dp / 100}</span>
                                                //                 </div>

                                                //             </div>

                                                //         </div>
                                                //     </div>
                                                // </div>
                                            )
                                            )}
                                        </div>
                                        </TabPanel>
                                        

                                        {this.state.categories.map((category, i) => (
                                            <TabPanel>
                                                { foodsArray.filter(food => food.ct == category).map((food, j) => (

<div class="food-preview">
<div class="food-img">
    <img src={foodimage} alt="" />
    <p>{food.h}</p>
</div>

<div class="row">
    <p class="total-rate">{food.op / 100}   </p>
    <div class="food-counter-btn">
    <i class="fa fa-plus _circle_round food-count-hide" aria-hidden="true"></i> 
        <p class="food-count"> 1 </p>
        <i class="fa fa-minus _circle_round food-count-hide" aria-hidden="true"></i> 
    </div>
</div>
</div>

                                //                     <div class="foods_box">
                                //                         <div class="foods_img_box">
                                //                             <img class="img-responsive" src={(food.iw!= null)?food.iw:"../../assets/food_image.jpg"} alt="" />
                                //                         </div>
                                //                         <div class="foods_txt_box">
                                //                             <div class="_cont_box ">
                                //                                 <img class="img-responsive" src={require('../../assets/veg_icon.svg').default} alt="" /> 
                                //                             </div>
                                //                             <div class="_cont_box">
                                //                                 <h4 class="_food_name">{food.h}</h4>
                                //                             </div>
                                //                             <div>
                                //                                 <div class="_cont_box">
                                //                                     {/* <i class="fa fa-plus _circle_round food-count-hide" aria-hidden="true"></i>
                                // <span class="_increase_number">ADD</span>
                                // <i class="fa fa-minus _circle_round food-count-hide" aria-hidden="true"></i> */}

                                //                                     {food_details.findIndex(obj => obj.id == food.id) >= 0 ? (
                                //                                         <div className={`${'remove' + food.id}`}>
                                //                                             <i class="fa fa-minus _circle_round" aria-hidden="true" onClick={() => addFood(food, 1, 'dec')}></i>
                                //                                             <span className={'qty' + food.id}>{food_details[food_details.findIndex(obj => obj.id == food.id)].qty}</span>
                                //                                             <i class="fa fa-plus _circle_round " aria-hidden="true" onClick={() => addFood(food, 1, 'inc')}></i>
                                //                                         </div>
                                //                                     ) : (
                                //                                             <button className={`btn btn_blue ${'add' + food.id}`} onClick={() => addFood(food, 1)}  >Add </button>
                                //                                         )
                                //                                     }
                                //                                 </div>
                                //                                 <div class="_cont_box _float_right ">
                                //                                     <div class="p15px_">
                                //                                         {(food.op != 0) ? <><i class="fa fa-inr __price_food"></i>
                                //                                         <del class="__price_food"> {food.op / 100}</del></> : ''}
                                //                                     </div>
                                //                                     <div class="p15px_">
                                //                                         <i class="fa fa-inr __price_food"></i>
                                //                                         <span class="__price_food"> {food.dp / 100}</span>
                                //                                     </div>

                                //                                 </div>

                                //                             </div>
                                //                         </div>
                                //                     </div>



                                                ))}
                                            </TabPanel>
                                        ))}

                                    </div>


                                </Tabs>

                            </div>





                        </div>
              
                </div>

               </div>
               </div>


                {/* Login      */}
                {(this.state.showlogin == 1) ?
                    <div class="over_lay_login">
                        <div class="movies-login-box">

                            <div class="form_login">
                                <div class="form_cont"  >
                                    <h4>Login</h4>
                                    <p>Fill in the details below and get <br /> started quickly</p>
                                </div>
                                <form onSubmit={this.handleLoginSubmit}>
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Mobile Number</div>
                                        <input type="text" name="mobile" placeholder="9971****46" value={this.state.value} onChange={this.mobilehandleChange} />
                                        <i class="fa fa-phone set_abs" aria-hidden="true"></i>
                                    </div>
                                    {this.validator.message('mobile', this.state.mobile, 'required|min:10|max:10|numeric')}
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Password</div>
                                        <input type="password" value={this.state.value} onChange={this.passwordhandleChange} name="password" placeholder="***" />
                                        <i class="fa fa-lock set_abs" aria-hidden="true"></i>

                                    </div>
                                    {this.validator.message('password', this.state.password, 'required|min:6|max:20')}
                                    <a href="#" onClick={this.forgotpassClick} class="forgot_pass">Forgot password?</a>
                                    <div class="text-center">
                                        <button type="submit" class="btn_style">Sign In</button>
                                        <span>or</span>
                                        <button onClick={this.loginotpClick} class="btn_style">Login with OTP</button>

                                    </div>
                                    <div class="register">
                                        <span>Don’t have an account?</span>
                                        <a onClick={this.registerClick} class="_register">Register</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> : ''}
                {(this.state.showforgotpass == 1) ?
                    <div class="over_lay_login">
                        <div class="movies-login-box">
                            <span style={{ float: "right", color: "black" }} onClick={this.forgotpassHide} aria-hidden="true">
                                <i class="fa fa-close"></i></span>
                            <div class="form_login">
                                <div class="form_cont"  >
                                    <h4>Forgot Password?</h4>
                                </div>
                                <form onSubmit={this.handleForgotpassSubmit}>
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Mobile Number</div>
                                        <input type="text" name="mobile" placeholder="9971****46" value={this.state.value} onChange={this.mobilehandleChange} />
                                        <i class="fa fa-phone set_abs" aria-hidden="true"></i>
                                    </div>
                                    {this.forgotvalidator.message('mobile', this.state.mobile, 'required|min:10|max:10|numeric')}
                                    <br />
                                    <div class="text-center">
                                        <button type="submit" class="btn_style">Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div> : ''}
                {(this.state.showotplogin == 1) ?
                    <div class="over_lay_login">
                        <div class="movies-login-box">
                            <span style={{ float: "right", color: "black" }} onClick={this.otploginHide} aria-hidden="true">
                                <i class="fa fa-close"></i></span>
                            <div class="form_login">
                                <div class="form_cont"  >
                                    <h4>Login with OTP</h4>
                                </div>
                                <form onSubmit={this.handleOtpLoginSubmit}>
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Mobile Number</div>
                                        <input type="text" name="mobile" placeholder="9971****46" value={this.state.value} onChange={this.mobilehandleChange} />
                                        <i class="fa fa-phone set_abs" aria-hidden="true"></i>
                                    </div>
                                    {this.otploginvalidator.message('mobile', this.state.mobile, 'required|min:10|max:10|numeric')}
                                    <br />
                                    <div class="text-center">
                                        <button type="submit" class="btn_style">Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div> : ''}
                {(this.state.showregister == 1) ?
                    <div class="over_lay_login">
                        <div class="movies-login-box">
                            <span style={{ float: "right", color: "black" }} onClick={this.registerHide} aria-hidden="true">
                                <i class="fa fa-close"></i></span>
                            <div class="form_login">
                                <div class="form_cont"  >
                                    <h4>Register</h4>
                                    <p>Fill in the details below and get <br /> started quickly</p>
                                </div>
                                <form onSubmit={this.handleRegisterSubmit}>
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Full Name</div>
                                        <input type="text" name="name" value={this.state.name} onChange={this.namehandleChange} />
                                        <i class="fa fa-user set_abs" aria-hidden="true"></i>
                                    </div>
                                    {this.registervalidator.message('name', this.state.name, 'required')}
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Email</div>
                                        <input type="text" name="email" value={this.state.email} onChange={this.emailhandleChange} />
                                        <i class="fa fa-envelope set_abs" aria-hidden="true"></i>
                                    </div>
                                    {this.registervalidator.message('email', this.state.email, 'required|email')}
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Mobile Number</div>
                                        <input type="text" name="mobile" placeholder="9971****46" value={this.state.value} onChange={this.mobilehandleChange} />
                                        <i class="fa fa-phone set_abs" aria-hidden="true"></i>
                                    </div>
                                    {this.registervalidator.message('mobile', this.state.mobile, 'required|min:10|max:10|numeric')}
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Password</div>
                                        <input type="password" value={this.state.value} onChange={this.passwordhandleChange} name="password" placeholder="***" />
                                        <i class="fa fa-lock set_abs" aria-hidden="true"></i>

                                    </div>
                                    {this.registervalidator.message('password', this.state.password, 'required|min:6|max:20')}
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Confirm Password</div>
                                        <input name="confirmpassword" value={this.state.value} onChange={this.confirmpasswordhandleChange} type="password" placeholder="***" />
                                        <i class="fa fa-lock set_abs" aria-hidden="true"></i>

                                    </div>
                                    {this.registervalidator.message('confirmpassword', this.state.confirmpassword, 'required|min:6|max:20')}
                                    {/* <a href="" class="forgot_pass">Forget password?</a> */}
                                    <br />
                                    <div class="text-center">
                                        <button type="submit" class="btn_style">Sign Up</button>

                                    </div>
                                    {/* <div class="register">
            <span>Don’t have an account?</span>
            <a href="" class="_register">Register</a>
        </div> */}
                                </form>
                            </div>
                        </div>
                    </div> : ''}
                {(this.state.otpshow == 1) ?
                    <div class="over_lay_login">
                        <div class="movies-login-box">
                            <div class="form_login">
                                <div class="form_cont"  >
                                    {/* <h4>Register</h4>
        <p>Fill in the details below and get <br /> started quickly</p>*/}
                                </div>

                                <form onSubmit={this.handleotpSubmit}>

                                    <div class="form_group pos_relative">
                                        <div class="name_field">Enter OTP</div>
                                        <input name="otp" value={this.state.value} onChange={this.otphandleChange} type="text" />
                                        <i class="fa fa-lock set_abs" aria-hidden="true"></i>

                                    </div>
                                    {this.otpvalidator.message('otp', this.state.otp, 'required|numeric|min:6|max:6')}
                                    <a href="#" onClick={this.resendOtp} class="forgot_pass">Resend OTP</a>
                                    <div class="text-center">
                                        <button type="submit" class="btn_style">Submit OTP</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    : ''}
                {(this.state.resetpassshow == 1) ?
                    <div class="over_lay_login">
                        <div class="movies-login-box">
                            <span style={{ float: "right", color: "black" }} onClick={this.resetpassHide} aria-hidden="true">
                                <i class="fa fa-close"></i></span>
                            <div class="form_login">
                                <div class="form_cont"  >
                                    <h4>Reset Password</h4>
                                </div>
                                <form onSubmit={this.handleresetpassSubmit}>
                                    <div class="form_group pos_relative">
                                        <div class="name_field">OTP</div>
                                        <input type="text" name="otp" value={this.state.value} onChange={this.otphandleChange} />
                                        <i class="fa fa-lock set_abs" aria-hidden="true"></i>
                                    </div>
                                    {this.resetpassvalidator.message('otp', this.state.otp, 'required|min:6|max:6|numeric')}
                                    <a href="#" onClick={this.resendOtp} class="forgot_pass">Resend OTP</a>
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Password</div>
                                        <input type="password" name="password" value={this.state.value} onChange={this.passwordhandleChange} />
                                        <i class="fa fa-lock set_abs" aria-hidden="true"></i>
                                    </div>
                                    {this.resetpassvalidator.message('password', this.state.password, 'required|min:6')}
                                    <div class="form_group pos_relative">
                                        <div class="name_field">Confirm Password</div>
                                        <input type="password" name="confirmpassword" value={this.state.value} onChange={this.confirmpasswordhandleChange} />
                                        <i class="fa fa-lock set_abs" aria-hidden="true"></i>
                                    </div>
                                    {this.resetpassvalidator.message('confirmpassword', this.state.confirmpassword, 'required|min:6')}
                                    <br />
                                    <div class="text-center">
                                        <button type="submit" class="btn_style">Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div> : ''}

                {/* <Footer /> */}
            </>
        );
    }
}

export default Food;