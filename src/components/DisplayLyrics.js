import React, {Component} from 'react';
import {apiSeedsApiUrl, apiSeedsKey} from "../constants/Api.js"
import Axios from "axios";
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
            Axios({
                url: `${apiSeedsApiUrl}${this.props.artist}/${this.props.track}`,
                method: "GET",
                params: {
                    apikey:apiSeedsKey ,
                }

            }).then((res) => {
                if (res.data.result.track.name === this.props.track) {
                    this.setState({
                        // lyric:res.data.result.track.text,
                        lyrics: res.data.result.track.text.split("\n"),
                    })
                }
                // console.log(res.data.result.track.text.split('\n').slice(0,11));
            }).catch(error => {
                console.log(error.message)
                alert("sorry, we cannot find the lyrics of the song😢")
            }
            )
        }
    }
    renderLyrics=()=>{
        const lyricsLines = this.state.lyrics.map((line, index) => {
            return (<p key={index}>{line}</p>)
        })
        return(
            <div className="lyricsWrapper">
                {lyricsLines}
                <a href="#header">go to top</a>
            </div>
        )
        
    }
    renderLoading=()=>{
        return (<h2>Please select your song</h2>
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