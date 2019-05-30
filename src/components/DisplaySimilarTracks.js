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
            track: "La Isla Bonita",
            artist: "Madonna",
            uerChoice: "Time after Time",
            // lyric: "",
            lyrics: []
        }	
    }	
    componentDidMount(){
        Axios({
            url: lastfmBaseApiUrl,
            // method: "GET",
            // dataResponse: "JSON",
            params: {
                api_key: lastfmApiKey,
                method: "track.getsimilar",
                format: "json",
                track: this.state.track,
                artist: this.state.artist,
                limit: 9
            }

        }).then((res) => {
            console.log(res);

        }).catch(error => {
            console.log(error)
        }
        )
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
    }
    render(){
        return(
            <main>
                <form action="">
                    <label htmlFor="artist"></label>
                    <input onChange={this.handleInputChange} type="text"  id="artist" value={this.state.artistInput} placeholder="type in the artist name"/>
                    <label htmlFor="track"></label>
                    <input onChange={this.handleInputChange} type="text" id="track" value={this.state.trackInput} placeholder="type in the track name"/>
                    <button>Find it</button>
                </form>

                {/* <DisplayLyrics lyrics={this.state.lyrics} /> */}
            </main>
                

        )
    }
}
export default  DisplaySimilarTracks;