import React, {Component,Fragment} from 'react';
import SingleSavedSong from "./SingleSavedSong.js"
import firebase from "./Firebase.js";
import Particles from "react-particles-js";
import ParticlesConfig from "./ParticlesConfig.js";


class SongList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			songs: [],
            uid: this.props.uid,
			previewTrackUrl: "",
			isPlaying: false
		};
	}

	requireLogIn = () => {
		return <h2>log in to see your saved songs</h2>;
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
	handleRemove = (key) => {
		console.log(key);
		
		const dbRef = firebase.database().ref(`/${this.state.uid}`);
		console.log("deleted");
		dbRef.child(key).remove();
	}
    getList =()=>{
        const dbRef = firebase.database().ref(`/${this.state.uid}`);
		dbRef.on("value", res => {
				const newSongArr = [];
				const data = res.val();
				for (let key in data) {
					newSongArr.push([key,data[key]]);
				}
				console.log(newSongArr);
				this.setState({
                    songs: [...newSongArr],
				});
            });
    }
	displayList = () => {
		let jsxString = [];
		this.state.songs.forEach((track, i) => {
            console.log(i);
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
        })
        return(
            <div className="listWrapper wrapper">
                {jsxString}
            </div>
        )
	};
	componentDidMount() {
        // let uid = this.state.uid;
        // console.log(uid);
        this.getList();
    }
	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.uid!==prevProps.uid
		) {
			this.setState({
				uid: this.props.uid
            },()=>{
                this.getList();
            });
            
        }
        if (
			this.state.previewIndex !== prevState.previewIndex &&
			prevState.previewIndex !== undefined
		) {
			// this.state.audio.pause();
			console.log(prevState.previewIndex);
			const prevIndex = prevState.previewIndex;
			console.log(prevIndex);

			const prevAudio = document.getElementById(
				`savedPreview${prevIndex}`
			);
			console.log(prevAudio);
			if(prevAudio){
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
				<Particles canvasClassName="particleCanvas" width="100vw" height="100vh" params={ParticlesConfig} />
				{this.state.uid
					? this.displayList()
					: this.requireLogIn()}
			</Fragment>
		);
	}
}
export default SongList;