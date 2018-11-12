import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GMauthFailure from './GMauthFailure';

class MapCanvas extends Component {
    state = {
        map: null,
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false
    }

    mapReady = (mapProps, map) => {
        this.setState({ map });
    }
    
    // https://github.com/fullstackreact/google-maps-react/blob/master/README.md
    onInfoWindowClose = () => {
        this.setState({ showingInfoWindow: false, activeMarker: null, activeMarkerProps: null });
    }

    // https://github.com/fullstackreact/google-maps-react/blob/master/README.md
    onMarkerClick = (props, marker) => {
        const place = this.props.searchResults.filter((place) => place.name === props.title)

        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props,
            selectedPlaceImg: place[0].img
        })
    }
    // https://github.com/fullstackreact/google-maps-react/blob/master/README.md
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    imgRenderCheck = () => {
        if (this.props.requestFailed) {
            return (
                <p> Not able to pull data from FourSquare </p>
            )
        } else {
            return (
                <div>
                    <img src={this.state.selectedPlace && this.state.selectedPlaceImg} alt="Photo of place by FourSquare"></img>
                    <a href={this.state.selectedPlace && this.state.selectedPlace.img}>Photos by FourSquare</a>
                </div>
            )
        }
    }




    render = () => {


        return (
            <Map
                role='application'
                aria-label='map'
                google={this.props.google}
                zoom={15}
                initialCenter={this.props.startMapCenter}
                onReady={this.mapReady}
                onClick={this.onMapClicked}
            >

                {this.props.searchResults && this.props.searchResults.map((place, index) =>
                    <Marker
                        key={index}
                        position={place.geometry.location}
                        animation={this.props.google.maps.Animation.DROP}
                        onClick={this.onMarkerClick}
                        name={place.name}
                        title={place.name}
                        placeRating={place.rating}
                        img={place.img}


                    />
                )}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}>

                    <div className="info-window">
                        <h1> {this.state.selectedPlace && this.state.selectedPlace.name}</h1>
                        <h3> Rating: {this.state.selectedPlace && this.state.selectedPlace.placeRating}</h3>
                        <p> Rating by Google Places</p>
                        {this.imgRenderCheck()}
                    </div>


                </InfoWindow>
            </Map>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyARPBGEvrweLTkN1hfndTYsQDTt-ytv81g'), LoadingContainer: GMauthFailure
})(MapCanvas)

