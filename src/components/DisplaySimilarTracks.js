import React, {Component, Fragment} from 'react';
import { lastfmBaseApiUrl, lastfmApiKey } from "../constants/Api.js"
import Axios from "axios";
import DisplayLyrics from "./DisplayLyrics.js";

class DisplaySimilarTracks extends Component{
    constructor(){
        super();
        this.state={
            backMusicData: [],
            // musicApiBack: false,
            inputPlaceholder: "",
            inputString:"",
            trackUserChoice: "",
            artistUserChoice:"",
            // lyric: "",
            // lyrics: []
        }	
    }
    handleTrackChange = (e) => {
        this.setState({
            inputPlaceholder: e.target.value
        })
    }
    handleTrackClick=()=>{
        this.setState({
            inputPlaceholder:"",
        })
    }
    handleFormSubmit =(e)=>{
        e.preventDefault();
        if(this.state.inputPlaceholder!==""){
            this.setState({
                inputString: this.state.inputPlaceholder,
                inputPlaceholder: "",
            })
        }
        else(
            alert("check your spelling!")
        )
    }
    handleDbClick =(e)=>{
        console.log(e.target);
        this.setState({
            trackUserChoice:e.target.dataset.track,
            artistUserChoice:e.target.dataset.artist,
        })
    }
    renderLoadingPage=()=>{
        return(
            <div className="loading">
                <p>Please type in track and artist</p>
            </div>
        )
    }
    displayTracks=()=>{
        const jsxString = [];
        this.state.backMusicData.forEach((track) => {
            if (track.trackViewUrl !== undefined) {
                jsxString.push(
                    <div key={track.trackId} className="singleTrack">
                        <div className="trackWrapper">
                            <div className="imgWrapper">
                                <a target="_blank" href={track.trackViewUrl}>
                                    <img src={track.artworkUrl100} alt={`picture of the album ` + track.collectionCensoredName} />
                                </a>
                            </div>
                            <p 
                                className="trackInfo" 
                                data-artist={track.artistName} 
                                data-track={track.trackName} 
                                onDoubleClick={this.handleDbClick} >
                                    {track.artistName}<br/>
                                    {track.trackName}
                            </p>
                        </div>
                    </div>
                )

            } else {
                jsxString.push (
                    <div key={track.trackID} className="singleTrack">
                        <div className="trackWrapper">
                            <div className="imgWrapper">
                                <a target="_blank" href={track.collectionViewUrl}>
                                    <img src={track.artworkUrl100} alt={`picture of the album ` + track.collectionCensoredName} />
                                </a>
                            </div>
                            <p 
                                className="trackInfo" 
                                data-artist={track.artistName} 
                                data-track={track.trackName}  
                                onDoubleClick={this.handleDbClick}>
                                {track.artistName}<br/>
                                {track.trackName}
                            </p>
                        </div>
                    </div>
                )
            }
        })
        return(
            <div className="tracksWrapper">
                {jsxString}
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
        if(this.state.inputString!==prevState.inputString){
            Axios({
                url:"https://itunes.apple.com/search?parameterkeyvalue",
                method: "GET",
                dataResponse: "JSON",
                params: {
                    term:this.state.inputString,
                    country:"ca",
                    media:"music",
                    limit:10
                }

            }).then((res) => {
                console.log(res.data.results);
                
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
            <Fragment>
                <header id="">
                    <form action="" onSubmit={this.handleFormSubmit}>
                        <label htmlFor="track"></label>
                        <input
                            onChange={this.handleTrackChange}
                            type="text"
                            id="trackInput"
                            value={this.state.inputPlaceholder}
                            placeholder="type in the track name"
                            onClick={this.handleTrackClick}
                        />
                        <button>Find it</button>
                    </form>
                </header>

                <main>
                    {this.state.backMusicData.length > 0 ? this.displayTracks() : this.renderLoadingPage()}

                    <DisplayLyrics track={this.state.trackUserChoice} artist={this.state.artistUserChoice}/>
                </main>
            </Fragment>
            
                

        )
    }
}
export default  DisplaySimilarTracks;