import React from 'react';
import FOOTER_DATA from './footer.data';
import FooterPreview from '../footer-preview/FooterPreview.component';
import {FaTwitter,FaFacebook,FaYoutube,FaLinkedin} from "react-icons/fa"
import './footer.css';


class Footer extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            collections: FOOTER_DATA
        }
    }
    render(){
        const { collections } = this.state;
        return(
            <div className="footer">
                <div className="footer-content-collection">
                    {
                        collections.map(({id, ...otherCollectionProps})=>(
                            <FooterPreview key={id} {...otherCollectionProps} />
                        ))
                    }
                </div>
                <div className="seperator"></div>
                <div className="copyright-section">
                    <div className="copy-left">
                        <p>Copyright WOW Cinema 2020 </p>
                        <p>Terms & Conditions | Privacy Policy | Terms of use</p>
                    </div>
                    <div className="copy-right">
                        <div className="icons">
                            <ul>
                                <li><a href="#"><FaFacebook/></a></li>
                                <li><a href="#"><FaTwitter/></a></li>
                                <li><a href="#"><FaYoutube/></a></li>
                                <li><a href="#"><FaLinkedin/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
