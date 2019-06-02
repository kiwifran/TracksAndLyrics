import React, {Component} from 'react';
import DisplayTracks from './components/DisplayTracks.js';
import Footer from "./components/Footer.js"
import './styles/styles.scss';

class App extends Component{
  render(){
    return (
      <div className="App">
        <DisplayTracks/>
        <Footer />
      </div>
    );
  }
  
}

export default App;