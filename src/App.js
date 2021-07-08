import React from 'react';
import Homepage from './pages/homepage/homepage.pages';
import Booking from './pages/booking/Booking.pages';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar.component';
import MovieSession from './components/moviesessions/MovieSession';
import SeatLayout from './components/seat-layout/SeatLayout.component';
import Food from './components/food/Food';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Homepage} />
        {/* <Route path='/booking/:title' component={Booking} /> */}
        <Route exact path='/moviesessions/:city/:moviename/:amcode' component={MovieSession}/>
        <Route exact path='/seatlayout/:cinemaname/:moviename' component={SeatLayout}/>
        <Route exact path='/food/:cinemaname/:moviename' component={Food}/>

        {/* <Route exact path='/seatlayout/:' component={SeatLayout}/> */}
      </Switch>
    </div>
  );
}

export default App;
