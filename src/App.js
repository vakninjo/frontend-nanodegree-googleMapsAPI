import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react';
import MapCanvas from './components/MapCanvas';


class App extends Component {
  state = {
    places: [
      {
        "name": "Kura Revolving Sushi Bar",
        "street": "9292 Warren Pkwy #320",
        "city": "Frisco",
        "state": "TX",
        "zip": "75035",
        "url": "http://kurausa.com/",
        "pos": { "lat": 33.109221, "lng": -96.801711 }
      },
      {
        "name": "Sushi Damu",
        "street": "3685 Preston Rd #101",
        "city": "Frisco",
        "state": "TX",
        "zip": "75034",
        "url": "http://sushidamutexas.com/",
        "pos": { "lat": 33.10999, "lng": -96.807553 }
      },
      {
        "name": "Roll & Poke",
        "street": "3311 Preston Rd #5",
        "city": "Frisco",
        "state": "TX",
        "zip": "75034",
        "url": "http://www.rollnpokedallas.com/",
        "pos": { "lat": 33.106629, "lng": -96.807427 }
      },
      {
        "name": "Great Wall Super Buffet",
        "street": "2750 Preston Rd",
        "city": "Frisco",
        "state": "TX",
        "zip": "75034",
        "url": "",
        "pos": { "lat": 33.286841, "lng": -96.782636 }
      },
      {
        "name": "Los Cucos Mexican Restaurant",
        "street": "4235 Preston Rd",
        "city": "Frisco",
        "state": "TX",
        "zip": "75034",
        "url": "http://www.mesoasiafrisco.com/",
        "pos": { "lat": 33.114745, "lng": -96.806301 }
      }
    ]

  }
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
