import React, {Component, Fragment} from "react";
import SaveTrack from "./SaveTrack.js";
class SingleTrack extends Component{
    constructor(props){
        super(props);
        this.state={
        }	
    }	
    singleTrack =()=>{
            const {track, trackId, i, handleClickOnSong, demoClick, isPlaying, previewIndex}=this.props
			const {trackViewUrl, collectionViewUrl, artworkUrl100, collectionCensoredName, previewUrl, artistName, trackName} = track;
            return(
					<div key={i} className="singleTrack">
						<div className="imgWrapper">
							{trackViewUrl!==undefined
                                ?<a
								tabIndex={6 + i * 3 + 1}
								target="_blank"
								rel="noopener noreferrer"
								href={trackViewUrl}
								aira-label="go to track's Itunes page">
								<img
									src={artworkUrl100}
									alt={
										`picture of the album ` +
										collectionCensoredName
									}
								/>
                                </a>
                                :<a
                                    tabIndex={6 + i * 3 + 1}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={collectionViewUrl}
                                    aira-label="go to track's Itunes page">
                                    <img
                                        src={artworkUrl100}
                                        alt={
                                            `picture of the album ` +
                                            collectionCensoredName
                                        }
                                    />
                                </a>
                            }   
						</div>
						<div className="trackInfo">
							<audio
								id={`audio${i}`}
								src={previewUrl}
								type="audio/m4a"
							/>
							<p tabIndex={6 + i * 3 + 2}>
								{artistName}
							</p>
							<p
								tabIndex={6 + i * 3 + 3}
								className="trackName"
								data-artist={artistName}
								data-track={trackName}
								onClick={handleClickOnSong}
							>
								{trackName}
							</p>
							<button
								className="previewButton"
								onClick={() => {
									demoClick(i);
								}}
							>
								{isPlaying &&
								previewIndex === i
									? "||"
									: ">"}
							</button>
							{this.props.user
							?<SaveTrack user={this.props.user} trackId={trackId} track={track} />
							:"log in to save"
							}
						</div>
					</div>
				);
			
			
    }
    componentDidUpdate(prevProps, prevState) {
    }
    render(){
        return(
            <Fragment>
                {this.singleTrack()}
            </Fragment>
        )
    }
}
export default SingleTrack;