import React, {Component, Fragment} from "react";
import {itunesApiUrl} from "../constants/Api.js";
import SingleTrack from "./SingleTrack.js";
import Qs from "qs";
import Axios from "axios";
import Swal from "sweetalert2";
import animateScrollTo from 'animated-scroll-to';
import Rellax from "rellax";
import DisplayLyrics from "./DisplayLyrics.js";
import GoUpButton from "./GoUpButton.js";
import RellaxDisplay from "./RellaxDisplay.js";

class DisplayTracks extends Component {
	constructor() {
		super();
		this.state = {
			//store track search results coming back from the API call, users' input for track search and users' choice of the song that they want to check the lyrics.
			backMusicData: [],
			inputPlaceholder: "",
			inputString: "",
			trackUserChoice: "",
			artistUserChoice: "",
			previewTrackUrl: "",
			isPlaying: false,
			audio:null
			// icon: ">"
        };
	}
	
	//when users are typing in the search bar， getting the value of users' input.
	handleInputChange = e => {
		this.setState({
			inputPlaceholder: e.target.value
		});
	};
	//when users click in the search bar text, clear the search bar for a better user experience.
	handleInputClick = () => {
		this.setState({
			inputPlaceholder: ""
		});
	};
	//when users make up their mind for what to search and submit the form, first, check if users input has actual content(instead of empty string or string made up of spaces), then store users' input as a final search term. Render a reminder for users if they submit the form without typing actual words.
	handleFormSubmit = e => {
		e.preventDefault();
		if (
			this.state.inputPlaceholder !== "" &&
			/^\s*$/.test(this.state.inputPlaceholder) === false
		) {
			this.setState({
				inputString: this.state.inputPlaceholder,
				inputPlaceholder: ""
			});
			const scrollSpeed = {
				speed: 2000,
				minDuration: 1600
			};
			animateScrollTo(
				document.querySelector(".trackResultWrapper"),
				scrollSpeed
			);
		} else
			Swal.fire({
				title: "Input Error!",
				text: "Please check your input",
				background: "#1a3543",
				confirmButtonText: "Cool",
				confirmButtonColor: "#7a9aaa"
			});
	};
	demoClick = index => {
		let audio = document.getElementById(`audio${index}`)
		console.log(audio);
		
		this.setState(
			{
				isPlaying: !this.state.isPlaying,
				previewIndex:index,
				audio:audio,
			},
			() => {
				this.state.isPlaying ? this.state.audio.play() : this.state.audio.pause();
			}
		);
		audio.onended = (e) => {
			this.setState({
				isPlaying:false
			})
			}
			
	}
		
	//provide a loading page and information about the app for users
	renderLoadingPage = () => {
		return (
			<div className="loadingTracks wrapper">
				<h3 tabIndex="4">
					Please <span>type in</span> track or artist name to search{" "}
					<span>♫</span>
				</h3>
			</div>
		);
	};
	//display search results on the page. When users click on the image of a song, the app will open a new tab to show the song's Itunes page.
	//Though the API provides a trackId for every track, but when I used the trackId as the key of the single track wrapper, sometimes react would tell me there were repeated keys, so I used the index as the key for single track wrapper div to avoid key repetition
	displayTracks = () => {
		let jsxString=[]
		this.state.backMusicData.forEach((track, i) => {
			jsxString.push(
			<SingleTrack
				key={track.trackId}
				track={track}
				trackId={track.trackId}
				i={i}
				handleClickOnSong={this.handleClickOnSong}
				demoClick={this.demoClick}
				isPlaying={this.state.isPlaying}
				previewIndex={this.state.previewIndex}
				user={this.props.user}
			/>
			)
		});
		return (
			<div className="tracksWrapper wrapper">
				<h3 tabIndex="6">Results</h3>
				<div className="tracks">
						{jsxString}
				</div>
				<GoUpButton
					tabIndex="79"
					locationClass="nav"
					showText="Search another song"
				/>
			</div>
		);
	};
	//if users click on a track name after the search results show on the page, store users' choice in the state and pass the state values to displayLyrics component to trigger the second API call in that component.
	handleClickOnSong = e => {
		this.setState({
			trackUserChoice: e.target.dataset.track,
			artistUserChoice: e.target.dataset.artist
		});
	};
	//after the component has mounted, begin to use rellax.js
	componentDidMount() {
		const rellax = new Rellax(".rellax");
	}
	//If the input string changes in the state, make the first API call to search tracks and store the data coming. The API call will Only be triggered if users search for a term that differs from the last time. Render a notice if API call fails.
	componentDidUpdate(prevProps, prevState) {
		if (this.state.inputString !== prevState.inputString) {
			//using proxy to call Itunes API
			Axios({
				method: "GET",
				url: "https://proxy.hackeryou.com",
				dataResponse: "json",
				paramsSerializer: function(params) {
					return Qs.stringify(params, { arrayFormat: "brackets" });
				},
				params: {
					reqUrl: itunesApiUrl,
					params: {
						term: this.state.inputString,
						country: "ca",
						media: "music",
						limit: "24",
						lang: "en_us",
						entity: "musicTrack"
					},
					xmlToJSON: false
				}
			})
				.then(res => {
					console.log(res);
					this.setState({
						backMusicData: res.data.results
					});
				})
				.catch(error => {
					Swal.fire({
						title: "Sorry",
						text: "We cannot find your song now😢",
						background: "#1a3543",
						confirmButtonText: "OK",
						confirmButtonColor: "#7a9aaa"
					});
				});
		}
		if(prevState.previewIndex!==undefined && this.state.previewIndex!==prevState.previewIndex) {
			// this.state.audio.pause();
			console.log(prevState.previewIndex);
			const prevIndex = prevState.previewIndex;
			console.log(prevIndex);
			
			const prevAudio = document.getElementById(`audio${prevIndex}`);
			console.log(prevAudio);
			
			prevAudio.pause();
			let audio = document.getElementById(`audio${this.state.previewIndex}`);
			this.setState(
				{
					audio: audio,
					isPlaying: true
				},
				() => {
					this.state.isPlaying
						? this.state.audio.play()
						: this.state.audio.pause();
				}
			);
		}
		if(this.state.inputString && this.state.inputString!==prevState.inputString &&this.state.audio){
				this.setState({
					isPlaying: false
				});
		}
		
	}
	render() {
		return (
			<Fragment>
				<header className="header">
					<div className="headerWrapper wrapper">
						<RellaxDisplay />
						<h1 tabIndex="1">Melodies & Words</h1>
						<form action="" onSubmit={this.handleFormSubmit}>
							<label
								aria-hidden="true"
								tabIndex="2"
								htmlFor="track"
								className="visuallyHidden"
							/>
							<input
								aria-hidden="true"
								tabIndex="3"
								aria-live="polite"
								role="status"
								onChange={this.handleInputChange}
								type="text"
								id="trackInput"
								value={this.state.inputPlaceholder}
								placeholder="type in the track name"
								onClick={this.handleInputClick}
							/>
							<button className="longButton submitSearch">Find it</button>
						</form>
					</div>
				</header>
				<main>
					<div className="trackResultWrapper">
						{this.state.backMusicData.length > 0
							? this.displayTracks()
							:this.renderLoadingPage()}
					</div>
					<DisplayLyrics
						track={this.state.trackUserChoice}
						artist={this.state.artistUserChoice}
					/>
				</main>
			</Fragment>
		);
	}
}
export default  DisplayTracks;