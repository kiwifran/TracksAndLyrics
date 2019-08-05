import React, {Component, Fragment} from "react";
import firebase from "./Firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class SaveTrack extends Component{
    constructor(props){
        super(props);
        this.state={
            isSaved:false,
            ariaLabel:"save the song in the list",
            userId: this.props.user.uid,
            savedSongsId: []
        }	
    }
    

    handleClick =()=>{
        console.log("saved");
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
    }
    checkSavedSongs = ()=> {
        const dbRef = firebase.database().ref(`/${this.state.userId}`);
        const savedSongsId = [];
        dbRef.on('value', (response) => {
            const data = response.val();
            for(let key in data) {
                savedSongsId.push(data[key].trackId)
            }
            // this.setState({
            //     savedSongsId :[...savedSongsId]
            // })
            if(savedSongsId.length && savedSongsId.includes(this.props.trackId)){
                console.log("savedLol");
				this.setState({
					isSaved: true,
					ariaLabel: "song already saved in the list"
				});
            }else{
                this.setState({
					isSaved: false,
					ariaLabel: "save the song in the list"
				});
            }
        })
    }
    componentDidMount(){
        // console.log("mounted");
        // const dbRef = firebase.database().ref(`/${this.state.userId}`);
        // const savedSongsId = [];
        // dbRef.on('value', (response) => {
        //     const data = response.val();
        //     for(let key in data) {
        //         savedSongsId.push(data[key].trackId)
        //     }
        //     this.setState({
		// 		savedSongsId: [...savedSongsId]
		// 	});
        //     if(this.state.savedSongsId.length && this.state.savedSongsId.includes(this.props.trackId)){
        //         console.log("savedLol");
		// 		this.setState({
		// 			isSaved: true,
		// 			ariaLabel: "song already saved in the list"
		// 		});
        //     }
        // })
        // console.log(savedSongsId);
        this.checkSavedSongs();
    }
    componentDidUpdate(prevProps, prevState) {
        // if(prevProps.track.trackId!==this.props.track.trackId) {
        //     this.checkSavedSongs();
        // }
        //sometimes it referesh the saved state(disabled) too slow, sometimes it does not refresh at all, check the database array the without setting state.
    }
    render(){
        return (
			<Fragment>
				<button
					className="saveTrack smallButton"
					disabled={this.state.isSaved}
					aria-label={this.state.ariaLabel}
					onClick={this.handleClick}
					title={this.state.ariaLabel}
				>
					{/* {
                        !this.state.isSaved
                            ?<FontAwesomeIcon icon="save" />
                            :<FontAwesomeIcon icon="save" />
                    } */}
					<FontAwesomeIcon icon="save" />
				</button>
			</Fragment>
		);
    }
}
export default SaveTrack;