import React, {Component, Fragment} from "react";
import firebase from "./Firebase.js";
class SaveTrack extends Component{
    constructor(){
        super();
        this.state={
            isSaved:false,
            ariaLabel:"save the song in the list"
        }	
    }
    handleClick =()=>{
        console.log("saved");
        const dbRef = firebase.database().ref();
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
    }
    componentDidMount(){
        console.log("mounted");
        const dbRef = firebase.database().ref();
        const savedSongsId = [];
        dbRef.on('value', (response) => {
            const data = response.val();
            for(let key in data) {
                savedSongsId.push(data[key].trackId)
            }
            if(savedSongsId.length && savedSongsId.includes(this.props.trackId)){
                console.log("savedLol");
				this.setState({
					isSaved: true,
					ariaLabel: "song already saved in the list"
				});
            }
        })
        console.log(savedSongsId);
        
    }
    componentDidUpdate(prevProps, prevState) {
    }
    render(){
        return(
            <Fragment>
                <button className="saveTrack" disabled={this.state.isSaved} aria-label={this.state.ariaLabel} onClick={this.handleClick}>
                    {
                        !this.state.isSaved
                            ? "+"
                            : "Saved"
                    }
                </button>
            </Fragment>
        )
    }
}
export default SaveTrack;