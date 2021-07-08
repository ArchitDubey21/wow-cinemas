import { React, Component} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import search from '../../assets/search.png';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Navbar.styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import axios from "axios";
import * as Constants from '../../Constants/index';
import swal from 'sweetalert';

class NavbarMenu extends Component {
    constructor(props) {
       if(localStorage.getItem('userid') == null)
        localStorage.setItem('userid',0); 
                super(props);
                this.state = {
                    cities: [],
                    lat: 0.0,
                    lng: 0.0,
                };
              }
          
            // handleChange(event) {
            //     this.setState({value: event.target.value});
            // }
            cityChange = event => {
                this.setState({ 'selectedcity': event.target.value });
                localStorage.setItem('selectedcity', event.target.value);
                //   alert(localStorage.getItem('selectedcity'));
                window.location = '/';
            }
    componentDidMount(){
        let formData = new FormData();    //formdata object
        formData.append('country', Constants.country);   //append the values with key, value pair
        formData.append('av', Constants.av);
        formData.append('pt', Constants.pt);
        formData.append('userid', localStorage.getItem('userid'));
        formData.append('lat', this.state.lat);
        formData.append('lng', this.state.lng);

        const sendGetRequest = async () => {
          await this.getMyLocation();
            try {
                const resp = await axios.post(Constants.api + 'content/cities', formData).then(resp => {
                    //  casetype array   
                    if (resp.data.result == 'success') {
                        this.setState(
                            {
                                loading: 0
                            }
                        );
                        if (!localStorage.getItem('selectedcity')) {
                            localStorage.setItem('selectedcity', resp.data.output.cc.name);
                        }

                        let citiesArray = []
                        Object.keys(resp.data.output.ot).forEach(function (key) {
                            citiesArray.push(resp.data.output.ot[key])
                        });

                        this.setState({
                            cities: citiesArray,
                        })
                        console.log('cities');
                        console.log(this.state.cities);
                    } else {
                        console.log(resp.data.msg);
                        this.setState(
                            {
                                loading: 1
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
        // if (!sessionStorage.getItem('selectedcity'))
        sendGetRequest();
    }   
    getMyLocation = (e) => {
        let location = null;
        let latitude = null;
        let longitude = null;
        if (window.navigator && window.navigator.geolocation) {
            location = window.navigator.geolocation
        }
        if (location) {
            location.getCurrentPosition(function (position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

            })
        }
        this.setState({ lat: latitude, lng: longitude })

    }     
    render() {
        const citiesDropdownRender = this.state.cities.map(function (item, i) {
            // alert(item.mname);
            let selected = (item.name == localStorage.getItem('selectedcity')) ? "selected"
                : '';

            return (
                <>

                    <option value={item.name} key={i} selected={selected} >
                        {item.name}
                    </option>
                </>
            )
        });
        return(
            <Navbar collapseOnSelect expand="lg" variant="dark" bsPrefix="navbar">
            <Navbar.Brand href="#home">
                 <Link className="logo-container" to = '/'>
                     <div className="logo">
                         <img src={logo} alt=""/>
                     </div>
                 </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto options">
                <Link className='option' to='/shop'>Home</Link>
                <Link className='option' to='/option'>Location</Link>
                <Link className='option' to='/option'>WOW Factor</Link>
                <Link className='option' to='/option'>Know More</Link>
                <div className="select-location">
                    <img src={search} className='img-search' alt=""/>
                    <select class="location-change" value={this.state.value} onChange={this.cityChange}>
                        {citiesDropdownRender}
                    </select>
                </div>
                <button className="club">WOW CLUB</button>
                </Nav>
                {/* <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
                </Nav> */}
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavbarMenu;
