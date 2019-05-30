import React, {Component} from 'react';
import { lastfmBaseApiUrl, lastfmApiKey } from "../constants/Api.js"
import Axios from "axios";
import DisplayLyrics from "./DisplayLyrics.js";

class DisplaySimilarTracks extends Component{
    constructor(){
        super();
        this.state={
            backMusicData: [],
            musicApiBack: false,
            trackPlaceholder: "",
            artistPlaceholder: "",
            trackString:"",
            artistString:"",
            uerChoice: "Time after Time",
            // lyric: "",
            lyrics: []
        }	
    }
    handleArtistChange =(e)=>{
        this.setState({
            artistPlaceholder:e.target.value
        })
    }
    handleTrackChange = (e) => {
        this.setState({
            trackPlaceholder: e.target.value
        })
    }
    handleArtistClick=()=>{
        this.setState({
            artistPlaceholder:"",
        })
    }
    handleTrackClick=()=>{
        this.setState({
            trackPlaceholder:"",
        })
    }
    handleFormSubmit =(e)=>{
        e.preventDefault();
        if(this.state.trackPlaceholder!==""&&this.state.artistPlaceholder!==""){
            this.setState({
                trackString: this.state.trackPlaceholder,
                artistString: this.state.artistPlaceholder,
                trackPlaceholder: "",
                artistPlaceholder: "",
            })
        }
        else(
            alert("check your spelling!")
        )
    }
    renderLoadingPage=()=>{
        return(
            <div className="loading">
                <p>Please type in track and artist</p>
            </div>
        )
    }
    displayTracks=()=>{
        return(
            <div className="tracksWrapper">
                {this.state.backMusicData.map((track, i)=>{
                    return(
                        <div key={track.trackID} className="singleTrack">
                            <div className="trackWrapper">
                                <div className="imgWrapper">
                                    <a target="_blank" href={track.trackViewUrl}>
                                        <img src={track.artworkUrl100} alt={`picture of the album ` + track.collectionCensoredName}/>
                                    </a>
                                </div>
                                <div className="infoWrapper">
                                    <p>{track.artistName}</p>
                                    <p>{track.trackName}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    componentDidMount(){
        
        // Axios({
        //     url: `https://orion.apiseeds.com/api/music/lyric/${this.state.artist}/${this.state.track}`,
        //     method: "GET",
        //     params: {
        //         apikey: "NwvEEhvTSAjQ5YEndl9ylxZ6OH90YtNtcDsrMWU3vShjz1dsY948lmjdvlbAQv8h",

        //     }

        // }).then((res) => {
        //     if (res.data.result.track.name === this.state.track) {
        //         this.setState({
        //             // lyric:res.data.result.track.text,
        //             lyrics: res.data.result.track.text.split("\n"),
        //         })
        //     }
        //     // console.log(res.data.result.track.text.split('\n').slice(0,11));
        // }).catch(error => {
        //     console.log(error.message)
        // }
        // )
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.artistString!==prevState.artistString||this.state.trackString!==prevState.trackString){
            Axios({
                url:"https://itunes.apple.com/search?parameterkeyvalue",
                method: "GET",
                dataResponse: "JSON",
                params: {
                    term:this.state.trackString,
                    country:"ca",
                    media:"music",
                    limit:10
                }

            }).then((res) => {
                this.setState({
                    backMusicData:res.data.results,
                })

                
                

            }).catch(error => {
                console.log(error)
            })
        }
        
    }
    render(){
        return(
            <main>
                <form action="" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="artist"></label>
                    <input 
                        onChange={this.handleArtistChange} 
                        type="text"  
                        id="artistInput" 
                        value={this.state.artistPlaceholder}  
                        placeholder="type in the artist name"
                        onClick={this.handleArtistClick}
                    />
                    <label htmlFor="track"></label>
                    <input 
                        onChange={this.handleTrackChange} 
                        type="text" 
                        id="trackInput" 
                        value={this.state.trackPlaceholder} 
                        placeholder="type in the track name"
                        onClick={this.handleTrackClick}
                    />
                    <button>Find it</button>
                </form>
                {this.state.backMusicData.length>0?this.displayTracks():this.renderLoadingPage()}

                {/* <DisplayLyrics lyrics={this.state.lyrics} /> */}
            </main>
                

        )
    }
}
export default  DisplaySimilarTracks;