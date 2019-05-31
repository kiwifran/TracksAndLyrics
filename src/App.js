import React, {Component} from 'react';
import DisplaySimilarTracks from './components/DisplaySimilarTracks.js';
import './styles/styles.scss';

class App extends Component{
  constructor(){
    super();
    this.state= {
      
    }
  }

  // async getSimilarTracks() {
  //   try {
  //     const trackData = await Axios.get(
  //       `${lastfmBaseApiUrl}/?method=track.getsimilar&format=json`,
  //       {
  //         params: {
  //           api_key: lastfmApiKey,
  //           track:"believe",
  //           artist:"Cher",
  //           limit: 10
  //         }

  //       }
  //     )
  //     console.log(trackData);
  //     this.setState({
  //       backMusicData: trackData.data.similartracks.track,
  //     })
  //     console.log(this.state.backMusicData)

  //   } catch (error) {
  //     console.log(error.message);

  //   }
  // }
  

  

  componentDidMount(){
    // this.getSimilarTracks();
    

    // this.setState({
    //   backMusicData:[],
    //   musicApiBack:true,
      
    // })
    
  }
  render(){
    return (
      <div className="App">
        <DisplaySimilarTracks/>
      </div>
    );
  }
  
}

export default App;