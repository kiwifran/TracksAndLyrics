import React, { Component } from "react";
import { apiSeedsApiUrl, apiSeedsKey } from "../constants/Api.js";
import Qs from "qs";
import Axios from "axios";
import Swal from "sweetalert2";
import animateScrollTo from "animated-scroll-to";
import GoUpButton from "./GoUpButton.js";
class DisplayLyrics extends Component {
	constructor() {
		super();
		this.state = {
			//holding lyrics coming back from the second API call for lyrics search
			lyrics: []
		};
	}
	//show lyrics line by line on the page with the track name below the track search results
	renderLyrics = () => {
		const lyricsLines = this.state.lyrics.map((line, index) => {
			return <p key={index}>{line} ♪</p>;
		});
		return (
			<div tabIndex="80" className="lyricsWrapper wrapper">
				<h3 className="lyricsTrackName">{this.props.track}</h3>
				{lyricsLines}
				<GoUpButton
					tabIndex="81"
					locationClass="trackResultWrapper"
					showText="Back to search results"
				/>
			</div>
		);
	};
	//provide a loading page and information about the app for users
	renderLoading = () => {
		return (
			<div className="loadingLyrics wrapper">
				<h3 tabIndex="5">
					Please <span>click</span> on the song's name to check its
					lyrics after search results show on the page <span>♬</span>
				</h3>
			</div>
		);
	};
	//check if the users are looking for the lyrics of a new song, if so, call the lyrics API and store the value in the state. if the lyrics for the song cannot be found in the API database, provide the notice for users.
	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.artist !== prevProps.artist ||
			this.props.track !== prevProps.track
		) {
			//using proxy to call Apiseeds lyrics API
			Axios({
				url: "https://proxy.hackeryou.com",
				dataResponse: "json",
				paramsSerializer: function(params) {
					return Qs.stringify(params, { arrayFormat: "brackets" });
				},
				params: {
					reqUrl: `${apiSeedsApiUrl}${this.props.artist}/${
						this.props.track
					}`,
					params: {
						apikey: apiSeedsKey
					},
					xmlToJSON: false
				}
			})
				.then(res => {
					if (res.data.result.track.name === this.props.track) {
						this.setState({
							lyrics: res.data.result.track.text.split("\n")
						});
						const scrollSpeed = {
							speed: 1500,
							minDuration: 1200
						};
						animateScrollTo(
							document.querySelector(".lyricsWrapper"),
							scrollSpeed
						);
					}
				})
				.catch(error => {
					Swal.fire({
						title: "Sorry",
						text: "We do not have the lyrics of the song😓",
						background: "#1a3543",
						confirmButtonText: "Fine",
						confirmButtonColor: "#7a9aaa"
					});
				});
		}
	}

	render() {
		return (
			<div className="lyricsResultWrapper">
				{this.state.lyrics.length > 0
					? this.renderLyrics()
					: this.renderLoading()}
			</div>
		);
	}
}
export default DisplayLyrics;
