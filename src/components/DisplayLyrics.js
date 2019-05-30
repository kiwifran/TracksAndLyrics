import React, {Component} from 'react';
class DisplayLyrics extends Component{
    constructor(){
        super();
        this.state={
        }	
    }	
    // componentDidMount(){
    //     this.fetchData();
    // }
    // componentDidUpdate(prevProps, prevState) {
    // }
    render(){
        return(
            <div className="lyricsWrapper">
                {this.props.lyrics.map((line,index)=>{
                    return(
                        <p key={index}>{line}</p>
                    )
                })}
            </div>
        )
    }
}
export default DisplayLyrics;