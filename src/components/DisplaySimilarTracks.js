import React, {Component, Fragment} from "react";
import {itunesApiUrl} from "../constants/Api.js"
import Axios from "axios";
import Swal from "sweetalert2";
import animateScrollTo from 'animated-scroll-to';
import Rellax from "rellax";
import DisplayLyrics from "./DisplayLyrics.js";
import GoUpButton from "./GoUpButton.js";
import RellaxDisplay from "./RellaxDisplay.js";

class DisplaySimilarTracks extends Component{
    constructor(){
        super();
        this.state={
            backMusicData: [],
            inputPlaceholder: "",
            inputString:"",
            trackUserChoice: "",
            artistUserChoice:"",
        }	
    }
    handleInputChange = (e) => {
        this.setState({
            inputPlaceholder: e.target.value
        })
    }
    handleInputClick=()=>{
        this.setState({
            inputPlaceholder:"",
        })
    }
    handleFormSubmit =(e)=>{
        e.preventDefault();
        if (this.state.inputPlaceholder !== "" && /^\s*$/.test(this.state.inputPlaceholder) === false){
            this.setState({
                inputString: this.state.inputPlaceholder,
                inputPlaceholder: "",
            })
            const scrollSpeed = {
                speed:2000,
                minDuration: 1600,
            }
            animateScrollTo(document.querySelector(".trackResultWrapper"),scrollSpeed);
        }
        else(
            Swal.fire({
                title: "Input Error!",
                text: "Please check your input",
                background:"#1a3543",
                confirmButtonText: "Cool",
                confirmButtonColor: "#7a9aaa",
            })
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
            <div className="loadingTracks wrapper">
                <h3>Please <span>type in</span> track or artist name to search <span>♫</span></h3>
            </div>
        )
    }
    
    displayTracks=()=>{
        const jsxString = [];
        this.state.backMusicData.forEach((track) => {
            if (track.trackViewUrl !== undefined) {
                jsxString.push(
                    <div key={track.trackId} className="singleTrack">
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
                                <span>{track.artistName}</span><br/>
                                {track.trackName} 
                            </p>
                    </div>
                )
            } else {
                jsxString.push (
                    <div key={track.trackID} className="singleTrack">
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
                                <span>{track.artistName}</span>
                                <br/>
                                {track.trackName}
                            </p>
                    </div>
                )
            }
        })
        return(
            <div className="tracksWrapper wrapper">
                <h3>Results</h3>
                <div className="tracks">
                    {jsxString}
                </div>
                <GoUpButton locationClass="header" showText="Search another song" />
            </div>
        )
    }
    componentDidMount(){
        const rellax = new Rellax(".rellax");
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.inputString!==prevState.inputString){
            Axios({
                url: itunesApiUrl,
                method: "GET",
                dataResponse: "JSON",
                params: {
                    term:this.state.inputString,
                    country:"ca",
                    media:"music",
                    limit:25,
                    lang: "en_us",
                    entity:"musicTrack"
                }
            }).then((res) => {
                console.log(res.data.results);
                
                this.setState({
                    backMusicData:res.data.results,
                })
            }).catch(error => {
                console.log(error)
                Swal.fire({
                    title: "Sorry",
                    text: "We cannot find your song now😢",
                    background: "#1a3543",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#7a9aaa",
                })
            })
        }
    }
    render(){
        return(
            <Fragment>
                <header className="header">
                    <div className="headerWrapper wrapper">
                    <RellaxDisplay />
                        <h1>Melodies & Words</h1>
                        <form action="" onSubmit={this.handleFormSubmit}>
                            <label htmlFor="track" className="visuallyHidden"></label>
                            <input
                                onChange={this.handleInputChange}
                                type="text"
                                id="trackInput"
                                value={this.state.inputPlaceholder}
                                placeholder="type in the track name"
                                onClick={this.handleInputClick}
                            />
                            <button className="submitSearch">Find it</button>
                        </form>
                    </div>
                </header>
                <main>
                    <div className="trackResultWrapper">
                        {this.state.backMusicData.length > 0
                            ? this.displayTracks()
                            : this.renderLoadingPage()}
                    </div>
                    <DisplayLyrics track={this.state.trackUserChoice} artist={this.state.artistUserChoice}/>
                </main>
            </Fragment>
        )
    }
}
export default  DisplaySimilarTracks;