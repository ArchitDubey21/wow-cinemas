import React from 'react';
import Header from '../../components/header/header.component';
import NowShowing from '../../components/now-showing/NowShowing.component';
import UpcomingMovies from '../../components/upcoming-movies/UpcomingMovies.component';
import Trailer from '../../components/trailer/Trailer.component';
import Factors from '../../components/factors/Factors.component';
import Offers from '../../components/offers/Offers.component';
import Top from '../../components/top/Top.component';
import News from '../../components/news/News.component';
import Footer from '../../components/footer/footer.component';

import './homepage.style.css';

const Homepage = () => {
    return(
        <div className='homepage'>
            <Header />
            <NowShowing />
            <UpcomingMovies />
            <Trailer />
            <Factors />
            <Offers />
            <Top />
            <News />
            <Footer />
        </div>
        );
    };
        
export default Homepage;