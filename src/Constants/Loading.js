import React, { Component } from 'react';
import '../App.css';
import { Offline, Online } from "react-detect-offline";
import logo from '../assets/Logo.png';
class Loading extends Component {


    render() {

        return (
            <>

                <div class="loading-screen">
                    <img
                        src={logo}
                        alt="" />
                        <Online>
                       {/* <img 
                        src={require('../assets/loader.gif').default}
                        alt="" /> */}
                          <h4 id="internet" style={{ color: "black"}}>   Service is temporarily unavailable due to maintainace.</h4>
                        </Online> 
                   
                    {/* Uh oh! Please check your internet connection */}
                    {/* {setTimeout(<Offline>{swal("Uh oh!", "Please check your internet connection.","info")}</Offline>,1000)} */}
                    <br/>
                    <Offline><h4 id="internet" style={{ color: "black"}}>Uh oh! Please check your internet connection.</h4> </Offline>
                </div>
                <section class="footer">
                    <div class="footer" style={{ color: "black", bottom: "10px" }}>
                        Powered By <b>Wemonde</b>
                    </div>
                    <div class="loading-screen">
                    </div>

                </section>


            </>);
    }
}
export default Loading;