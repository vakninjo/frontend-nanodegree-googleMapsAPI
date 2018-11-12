import React, { Component } from 'react';
import './App.css';
import MapCanvas from './components/MapCanvas';
import SideBar from './components/SideBar';
import googlePlaces from './localGooglePlaces.json';

//account 1
const clientId = "OYQS2RVPUAFOY2BKRIRBBFPVNACQQHMM3L5ROQMADJH1YSP4";
const clientSecret = "UBYI433XFUOEU3VWKMNWC5TLOBIPTFYHSRY4BDVL0EI2L0Q5";

class App extends Component {
  state = {
    offlinePlaces: googlePlaces,
    initCenter: { lat: '33.105226', lng: '-96.805046' },
    searchResults: [],
    open: false,
    readyMap: null,
    query: '',
    requestFailed: false
  }

  //sidebar callbacks
  closeSideBar = () => {
    this.setState({ open: !this.state.open })
  }
  openCloseSideBar = () => {
    // https://stackoverflow.com/questions/44351009/material-ui-left-drawer-in-app-bar-wont-close-on-overlay-click-or-menu-item-cli?rq=1
    this.setState({ open: !this.state.open });
  }
  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
      const filtered = this.state.searchResults.filter(place => place.name.toLowerCase().includes(query.toLowerCase()));
      this.setState({ searchResults: filtered });
    } else {
      this.setState({ searchResults: this.state.updatePlaces });
    }
  }
  selectedSearchResult = (placeName) => {
    document.querySelector(`[title="${placeName}"`).click()
    // https://stackoverflow.com/questions/44351009/material-ui-left-drawer-in-app-bar-wont-close-on-overlay-click-or-menu-item-cli?rq=1
    this.setState({ open: !this.state.open })
  }


  //enrich local locations with FourSquares data
  componentWillMount = () => {
    this.getFSData();
  }
  // Get venue ID
  getFSVenueID = (lat, lng, name) => {
    return fetch(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20181101&limit=1&ll=${lat},${lng}&query=${name}`)
      .then((response) => response.json())
      .then((response) => response.response.venues[0].id);
  }
  // Get venue data from venue ID
  getFSVenueInfo = (venueId) => {
    return fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20181101`)
      .then((response) => response.json())
      .then((response) => response.response.venue);
  }
  // FS data from API
  getFSData = () => {
    const updatedPlacesFSQR = this.state.offlinePlaces.map((place) => {
      const size = 200
      this.getFSVenueID(place.geometry.location.lat, place.geometry.location.lng, place.name)
        .then((venueId) => {
          this.getFSVenueInfo(venueId)
            .then((venueInfo) => {
              const buildURL = new URL(venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix);
              place.likes = venueInfo.likes.count
              place.img = buildURL.href
            })
            .catch(() => this.setState({ requestFailed: true })
        )})
        .catch(() => this.setState({ requestFailed: true }));
      return place;
    });
    this.setState({searchResults: updatedPlacesFSQR, updatePlaces: updatedPlacesFSQR}, () => console.log(this.state.searchResults));
    
  }
  


  render() {
    return (
      <div className="App">
        <div className="app-header">
          <h1 className="app-title">Sushi Finder - Frisco, TX</h1>
          <button onClick={this.openCloseSideBar} className="menu-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <MapCanvas
          startMapCenter={this.state.initCenter}
          readyMap={this.state.readyMap}
          searchResults={this.state.searchResults}
          requestFailed={this.state.requestFailed}

        />
        <SideBar
          open={this.state.open}
          openCloseSideBar={this.openCloseSideBar}
          updateQuery={this.updateQuery}
          searchResults={this.state.searchResults}
          query={this.state.query}
          selectedSearchResult={this.selectedSearchResult}
        />
      </div>
    );
  }
}

export default App;
