import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapCanvas from './components/MapCanvas';
import SideBar from './components/SideBar';

class App extends Component {
  state = {
    offlinePlaces: [
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
    ],
    initCenter: { lat: '33.111835', lng: '-96.804988' },
    readyMap: null,
    livePlaces: null,
    open: true

  }

  updateLivePaces = (livePlaces) => {
    this.setState({ livePlaces });
  }
  closeSideBar = () => {
    this.setState({ open: !this.state.open })
  }
  updateQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all, query)
    });
  }
  clickListItem = (index) => {
    this.setState({ open: !this.state.open })
  }


  render() {
    return (
      <div className="App">
        <div className="app-header">
          <button onClick={this.toggleDrawer} className="menuButton">
            <i className="fa fa-bars"></i>
          </button>
          <h1>Sushi Finder - Frisco, TX</h1>
        </div>
        <MapCanvas
          offlinePlaces={this.state.offlinePlaces}
          startMapCenter={this.state.initCenter}
          readyMap={this.state.readyMap}
          onUpdateLivePlaces={this.updateLivePaces}
          updatedLivePlaces={this.state.livePlaces}

        />
        <SideBar
          updatedLivePlaces={this.state.livePlaces}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
          filterLocations={this.updateQuery}
          clickListItem={this.clickListItem} />
      </div>
    );
  }
}

export default App;
