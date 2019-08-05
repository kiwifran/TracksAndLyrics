import React, {Component,Fragment} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SingleSavedSong extends Component{
    constructor(props){
        super(props);
        this.state={
        }	
    }	
    singleSong=()=>{
		const {track, i, serialNum, handleRemove, demoClick, isPlaying, previewIndex}=this.props;
		console.log(serialNum);
		
			const {trackViewUrl, collectionViewUrl, artworkUrl100, collectionCensoredName, previewUrl, artistName, trackName} = track;
            return (
				<div className="singleTrack">
					<div className="imgWrapper">
						{trackViewUrl !== undefined ? (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={trackViewUrl}
								aira-label="go to track's Itunes page"
							>
								<img
									src={artworkUrl100}
									alt={
										`picture of the album ` +
										collectionCensoredName
									}
								/>
							</a>
						) : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={collectionViewUrl}
								aira-label="go to track's Itunes page"
							>
								<img
									src={artworkUrl100}
									alt={
										`picture of the album ` +
										collectionCensoredName
									}
								/>
							</a>
						)}
					</div>
					<div className="trackInfo">
						<audio
							id={`savedPreview${i}`}
							src={previewUrl}
							type="audio/m4a"
						/>
						<p>{artistName}</p>
						<p className="trackNameSaved">
							{trackName}
						</p>
						<div className="buttonWrapper">
							<button
								className="previewButton smallButton"
								onClick={() => {
									demoClick(i);
								}}
							>
								{isPlaying && previewIndex === i ? (
									<FontAwesomeIcon icon="pause" />
								) : (
									<FontAwesomeIcon icon="play" />
								)}
							</button>
							<button
								className="smallButton"
								onClick={() => {
									handleRemove(serialNum);
								}}
							>
								<FontAwesomeIcon
									icon="trash-alt"
								/>
							</button>
						</div>
					</div>
				</div>
			);
			
    }
    componentDidMount(){
    }
    componentDidUpdate(prevProps, prevState) {
    }
    render(){
        return(
            <Fragment>
                {this.singleSong()}
            </Fragment>
        )
    }
}
export default SingleSavedSong;