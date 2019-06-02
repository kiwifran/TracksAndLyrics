import React, {Component} from 'react';
import {apiSeedsApiUrl, apiSeedsKey} from "../constants/Api.js"
import Qs from "qs";
import Axios from "axios";
import Swal from "sweetalert2";
import animateScrollTo from 'animated-scroll-to';
import GoUpButton from "./GoUpButton.js";
class DisplayLyrics extends Component{
    constructor(){
        super();
        this.state={
            lyrics: [],
        }	
    }	
    // componentDidMount(){
    //     this.fetchData();
    // }
    componentDidUpdate(prevProps, prevState){
        if (this.props.artist !== prevProps.artist || this.props.track !== prevProps.track) {
            //musixmatch
            // Axios({
            //     method: 'GET',
            //     url: 'https://proxy.hackeryou.com',
            //     //OR url: 'https://proxy.hackeryou.com',
            //     dataResponse: 'json',
            //     params: {
            //         reqUrl: "https://api.musixmatch.com/ws/1.1/track.search?",
            //         proxyHeaders: {
            //             "q_track": this.props.track,
            //             "q_artist": this.props.artist,
            //             apikey: "109d343b43d0208261a3497b00e8710a",
            //             "f_has_lyrics": true,
            //             "page_size": 5
            //         },
            //         xmlToJSON: false
            //     }
            // }).then((res) => {
            //         console.log(res);
            //     });
            //apiseed proxy
            Axios({
                url: "https://proxy.hackeryou.com",
                //OR url: "https://proxy.hackeryou.com",
                dataResponse: "json",
                paramsSerializer: function (params) {
                    return Qs.stringify(params, { arrayFormat: "brackets" })
                },
                params: {
                    // reqUrl: "https://api.musixmatch.com/ws/1.1/track.search?",
                    reqUrl: `${apiSeedsApiUrl}${this.props.artist}/${this.props.track}`,
                    params:{
                        apikey:"NwvEEhvTSAjQ5YEndl9ylxZ6OH90YtNtcDsrMWU3vShjz1dsY948lmjdvlbAQv8h"
                        // "q_track": this.props.track,
                        // // "q_artist": this.props.artist,
                        // "apikey": "109d343b43d0208261a3497b00e8710a",
                        // "f_has_lyrics": true,
                        // "page_size": 5
                    },
                    // proxyHeaders: {
                    //     "header_params": "value"
                    // },
                    xmlToJSON: false
                }
            }).then((res) => {
                if (res.data.result.track.name === this.props.track) {
                    this.setState({
                        // lyric:res.data.result.track.text,
                        lyrics: res.data.result.track.text.split("\n"),
                    })
                    const scrollSpeed = {
                        speed: 1500,
                        minDuration: 1200,
                    }
                    animateScrollTo(document.querySelector('.lyricsWrapper'),scrollSpeed)
                }
            }).catch(error => {
                console.log(error.message)
                Swal.fire({
                    title: "Sorry",
                    text: "We do not have the lyrics of the song😓",
                    background: "#1a3543",
                    confirmButtonText: "Fine",
                    confirmButtonColor: "#7a9aaa",
                })
            }
            )
        //     Axios({

        //         url:"https://api.musixmatch.com/ws/1.1/track.search",
        //         method: "GET",
        //         dataResponse: "JSONP",
        //         params: {
        //             "q_track":this.props.track,
        //             "q_artist":this.props.artist,
        //             apikey: "109d343b43d0208261a3497b00e8710a",
        //             "f_has_lyrics":true,
        //             "page_size":5
        //         }

        //     }).then((res) => {
        //         // if (res.data.result.track.name === this.props.track) {
        //         //     this.setState({
        //         //         // lyric:res.data.result.track.text,
        //         //         lyrics: res.data.result.track.text.split("\n"),
        //         //     })
        //         // }
        //         console.log(res);
                
        //         // console.log(res.data.result.track.text.split("\n").slice(0,11));
        //     }).catch(error => {
        //         console.log(error.message)
        //         alert("sorry, we cannot find the lyrics of the song😢")
        //     }
        //     )
        }
    }
    renderLyrics=()=>{
        const lyricsLines = this.state.lyrics.map((line, index) => {
            return (<p key={index}>{line} ♪</p>)
        })
        return(
            <div className="lyricsWrapper wrapper">
                <h3 className="lyricsTrackName">{this.props.track}</h3>
                {lyricsLines}
                <GoUpButton locationClass="trackResultWrapper" showText="Back to search results"/>
            </div>
        )
        
    }
    renderLoading=()=>{
        return (
            <div className="loadingLyrics wrapper">
                <h3>Please <span>double click</span> on the song's name to check its lyrics after search results show on the page <span>♬</span></h3>
            </div>
        
        )
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.lyrics!==prevProps.lyrics){
    //         this.setState({
                
    //         })
    //     }
    // }
    render(){
        return(
            <div className="lyricsResultWrapper">
                {this.state.lyrics.length >0?this.renderLyrics():this.renderLoading()}
            </div>
        )
    }
}
export default DisplayLyrics;