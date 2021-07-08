import React from 'react';
import MOVIE_DATA from '../now-showing/movie.data';
import {FaLongArrowAltRight} from 'react-icons/fa';
import './Top.style.css';
import MoviePreview from '../movie-preview/MoviePreview.component';
import * as Constants from '../../Constants/index';
import axios from "axios";



class Top extends React.Component{
    constructor(props){
        super(props);
        // this.state = {
        //     collections: MOVIE_DATA
        // }
        this.state = {
            collections: MOVIE_DATA,
            output:{},
            nowShowing:[],
            loading:1,
            genre:'',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        let formDataNS = new FormData();    //formdata object
        formDataNS.append('city', localStorage.getItem('selectedcity'));   //append the values with key, value pair
        formDataNS.append('av', Constants.av);
        formDataNS.append('pt', Constants.pt);
        formDataNS.append('did', Constants.did);
        formDataNS.append('userid', localStorage.getItem('userid'));
        formDataNS.append('dtmsource', 'local');
        formDataNS.append('mobile', '');

        const nowShowingRequest = async () => {
            try {
                const resp = await axios.post(Constants.api + 'content/nowshowing', formDataNS).then(resp => {
                    //  casetype array   
                    if (resp.data.result == 'success') {
                        this.setState(
                            {
                                loading: 0
                            }
                        );
                        console.log(resp.data.output);
                        let nowShowingArray = []
                        Object.keys(resp.data.output).forEach(function (key) {
                            nowShowingArray.push(resp.data.output[key])
                        });

                        this.setState({
                            nowShowing: nowShowingArray,
                        })
                        console.log("nowShowing");
                        console.log(this.state.nowShowing);
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
                this.setState(
                    {
                        loading: 1
                    }
                );
            }
        };
        nowShowingRequest();
    }
    handleChange = event=>{
      
        this.setState({
            genre:event.target.value
        })
    }
    render(){
        const {outputs} = this.state.output;
        const nowshowing = this.state.nowShowing.filter((item,idx) => idx < 3).map(function (item, i) {
        let nameForUrl = item.n.toString().toLowerCase().replaceAll(' ', '-');
            const otherCollectionProps= {
            
                id: i,
                title: item.mname,
                language: item.lng,
                genre: item.genre,
                director: item.mdirector,
                writers: 'Christopher Markus and Stephen McFeely',
                starring: item.martists,
                details: item.mlength,
                imageUrl: item.miv,
                slug: 'MIB',
                linkUrl: '/moviesessions/' + localStorage.getItem('selectedcity') + '/' + nameForUrl + '/' + item.id + '?language=' + item.lng,
                
                releasing: item.mopeningdate,
                trailer:item.mtrailerurl
              
            }
            return(
                <>
                    <div className="rank">
                        <span>#{i}</span>
                            <MoviePreview key={i} {...otherCollectionProps}/>
                    </div>
                </>
            )
        });
        return(
            <div className="top">
                <div className="top-content">
                    <h3>Top 3</h3>
                    <h4>Movies of the week</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no</p>
                    <button className="btn btn-ghost cinemas-btn"><a href="#">CINEMAS <span className='icons-arr'><FaLongArrowAltRight/></span></a></button>
                </div>
                {
                    // outputs.filter((item,idx) => idx < 3).map(({id, ...otherAdditionalProps}) => (
                    //     <div className="rank">
                    //     <span>#{id}</span>
                    //         <MoviePreview key={id} {...otherAdditionalProps}/>
                    //     </div>
                    // ))
                    nowshowing
                }
            </div>
        )
    }
}

export default Top;