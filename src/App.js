import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {GoogleApiWrapper} from 'google-maps-react';
import MapCanvas from './components/MapCanvas';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-header">
          <h1>Sushi Finder - Frisco, TX</h1>
        </div>
        <MapCanvas 

        />

      </div>
    );
  }
}

export default App;
