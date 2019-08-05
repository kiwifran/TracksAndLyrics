import React, {Component,Fragment} from 'react';
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
				<div className="savedTrack">
					<div className="imgWrapperSmall">
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
					<div className="savedTrackInfo">
						<audio
							id={`savedPreview${i}`}
							src={previewUrl}
							type="audio/m4a"
						/>
						<p>{artistName}</p>
						<p className="trackName">{trackName}</p>
						<button
							className="previewButton"
							onClick={() => {
								demoClick(i);
							}}
						>
							{isPlaying && previewIndex === i
								? "||"
								: ">"}
						</button>
						<button
							onClick={() => {
								handleRemove(serialNum);
							}}
						>
							remove
						</button>
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