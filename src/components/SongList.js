import React, { Component, Fragment } from "react";
import SingleSavedSong from "./SingleSavedSong.js";
import firebase from "./Firebase.js";
import Particles from "react-particles-js";
import ParticlesConfig from "../constants/ParticlesConfig.js";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SongList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			songs: [],
			uid: this.props.uid,
			previewTrackUrl: "",
			isPlaying: false,
			previewIndex: null,
			audio: null
		};
	}

	requireLogIn = () => {
		Swal.fire({
			title: "🎐Aah",
			text: "Please log in to see your song list",
			background: "#3c1706",
			confirmButtonText: "Fine",
			confirmButtonColor: "#d77649"
		});
		return <div className="listWrapper" />;
	};
	demoClick = index => {
		let audio = document.getElementById(`savedPreview${index}`);
		this.setState(
			{
				isPlaying: !this.state.isPlaying,
				previewIndex: index,
				audio: audio
			},
			() => {
				this.state.isPlaying
					? this.state.audio.play()
					: this.state.audio.pause();
			}
		);
		audio.onended = e => {
			this.setState({
				isPlaying: false
			});
		};
	};
	getList = dbRef => {
		dbRef.once("value", res => {
			const newSongArr = [];
			const data = res.val();
			for (let key in data) {
				newSongArr.push([key, data[key]]);
			}
			this.setState({
				songs: [...newSongArr]
			});
		});
	};
	handleRemove = key => {
		const dbRef = firebase.database().ref(`/${this.state.uid}`);
		dbRef.child(key).remove();
		this.getList(dbRef);
	};
	dumpAllSongs = () => {
		const dbRef = firebase.database().ref(`/${this.state.uid}`);
		dbRef.remove();
		this.getList(dbRef);
	};

	displayList = () => {
		let jsxString = [];
		this.state.songs.forEach((track, i) => {
			jsxString.push(
				<SingleSavedSong
					track={track[1]}
					key={track[0]}
					i={i}
					serialNum={track[0]}
					demoClick={this.demoClick}
					isPlaying={this.state.isPlaying}
					previewIndex={this.state.previewIndex}
					handleRemove={this.handleRemove}
				/>
			);
		});
		return (
			<div className="listWrapper wrapper">
				<div className="deleteAll">
					<button className="smallButton" onClick={this.dumpAllSongs}>
						<FontAwesomeIcon icon="dumpster" />
					</button>
					<p>Delete all songs</p>
				</div>

				<div className="savedSongs">{jsxString}</div>
			</div>
		);
	};
	componentDidMount() {
		const dbRef = firebase.database().ref(`/${this.state.uid}`);
		this.getList(dbRef);
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.uid !== prevProps.uid) {
			this.setState(
				{
					uid: this.props.uid
				},
				() => {
					const dbRef = firebase.database().ref(`/${this.state.uid}`);

					this.getList(dbRef);
				}
			);
		}
		if (
			prevState.previewIndex !== undefined &&
			this.state.previewIndex !== prevState.previewIndex
		) {
			const prevIndex = prevState.previewIndex;
			const prevAudio = document.getElementById(
				`savedPreview${prevIndex}`
			);
			if (prevAudio) {
				prevAudio.pause();
				let audio = document.getElementById(
					`savedPreview${this.state.previewIndex}`
				);
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
		}
	}
	render() {
		return (
			<Fragment>
				<Particles
					canvasClassName="particleCanvas"
					width="100vw"
					height="100vh"
					params={ParticlesConfig}
				/>
				{this.state.uid ? this.displayList() : this.requireLogIn()}
			</Fragment>
		);
	}
}
export default SongList;
