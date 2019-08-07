import React, { Component, Fragment } from "react";
import firebase from "./Firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class SaveTrack extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSaved: false,
			ariaLabel: "save the song in the list",
			userId: this.props.user.uid,
			keyInDb: null
		};
	}

	handleClick = () => {
		if (!this.state.isSaved) {
			const dbRef = firebase.database().ref(`/${this.state.userId}`);
			const {
				trackViewUrl,
				collectionViewUrl,
				artworkUrl100,
				collectionCensoredName,
				previewUrl,
				artistName,
				trackName,
				trackId
			} = this.props.track;

			dbRef.push({
				trackViewUrl,
				collectionViewUrl,
				artworkUrl100,
				collectionCensoredName,
				previewUrl,
				artistName,
				trackName,
				trackId
			});
			this.setState({
				isSaved: true,
				ariaLabel: "song already saved in the list"
			});
		} else {
			const dbRef = firebase.database().ref(`/${this.state.userId}`);
			dbRef.child(this.state.keyInDb).remove();
			this.setState({
				isSaved: false,
				ariaLabel: "save the song in the list",
				keyInDb: null
			});
		}
	};
	checkSavedSongs = () => {
		const dbRef = firebase.database().ref(`/${this.state.userId}`);
		const savedSongsId = [];
		dbRef.once("value", response => {
			const data = response.val();
			for (let key in data) {
				savedSongsId.push([key, data[key].trackId]);
			}
			if (
				savedSongsId.length &&
				savedSongsId.find(item => item[1] === this.props.trackId)
			) {
				const found = savedSongsId.find(
					item => item[1] === this.props.trackId
				);
				this.setState({
					isSaved: true,
					ariaLabel: "song already saved in the list",
					keyInDb: found[0]
				});
			} else {
				this.setState({
					isSaved: false,
					ariaLabel: "save the song in the list"
				});
			}
		});
	};
	componentDidMount() {
		this.checkSavedSongs();
	}
	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.trackId !== this.props.trackId ||
			(prevState && prevState.isSaved !== this.state.isSaved)
		) {
			this.checkSavedSongs();
		}
	}
	render() {
		return (
			<Fragment>
				<button
					className="saveTrack smallButton"
					// disabled={this.state.isSaved}
					aria-label={this.state.ariaLabel}
					onClick={this.handleClick}
					title={this.state.ariaLabel}
				>
					{!this.state.isSaved ? (
						<FontAwesomeIcon icon="save" />
					) : (
						<FontAwesomeIcon icon="trash-alt" />
					)}
				</button>
			</Fragment>
		);
	}
}
export default SaveTrack;
