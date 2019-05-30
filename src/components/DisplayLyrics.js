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
    renderLyrics=()=>{
        const lyricsLines = this.props.lyrics.map((line, index) => {
            return (<p key={index}>{line}</p>)
        })
        return(
            <div className="lyricsWrapper">
                {lyricsLines}
            </div>
        )
        
    }
    renderLoading=()=>{
        return (<h2>Please select your song</h2>
)
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.lyrics!==prevProps.lyrics){
    //         this.setState({
                
    //         })
    //     }
    // }
    render(){
        return(
            <div className="lyricsResultWrapper">
                {this.props.lyrics.length >0?this.renderLyrics():this.renderLoading()}
            </div>
        )
    }
}
export default DisplayLyrics;