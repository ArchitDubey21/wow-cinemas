import React from 'react';
import MOVIE_DATA from './movie.data.js';
import MoviePreview from '../movie-preview/MoviePreview.component';
import {FaLongArrowAltRight} from 'react-icons/fa';
import axios from "axios";
import * as Constants from '../../Constants/index';
import swal from 'sweetalert';


import './NowShowing.style.css';


class NowShowing extends React.Component{
    constructor(props){
        super(props);

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
        let genre = this.state.genre;
        let count = 0;
        const nowshowing = this.state.nowShowing.filter((item,idx) => idx < 10).map(function (item, i) {
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
        let genr = item.mgenre;
        if(genr.toLowerCase().includes(genre.toLowerCase()) ==true)
        {
            count = count+1;
            return(

                <>
                            <MoviePreview key={i} {...otherCollectionProps}/>
                     
                </>
            )
        }
        });
        const {collections} = this.state;
        return(
            <div className="now-showing">
                <div className="now-showing-top">
                    <h2>Now Showing</h2>
                    <select class="location-change genre" value={this.state.genre} onChange={this.handleChange}>
                        <option value="">Select Genre</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="anime">Animation</option>
                    </select>
                </div>

                <div className="movie-preview-collection">
                {(count>0)?nowshowing:'No Movies Available'}
                </div>
                {
                    (count>9)?<div className="row view-button">
                    <button className="btn btn-ghost view-btn"><a href="#">VIEW ALL <span className='icons-arr'><FaLongArrowAltRight/></span></a></button>
                </div>: ''
                }
                {/* <div className="row view-button">
                    <button className="btn btn-ghost view-btn"><a href="#">VIEW ALL <span className='icons-arr'><FaLongArrowAltRight/></span></a></button>
                </div> */}
            </div>
        )
    }
}

export default NowShowing;