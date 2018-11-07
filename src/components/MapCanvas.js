import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapCanvas extends Component {
    state = {


    }

    mapReady = (mapProps, map) => {
        // Save the map reference in state and prepare the location markers
        this.setState({ map }, this.goolgePlacesAPI(mapProps, map));

        // this.setState({ newPlaces })

    }
    fetchPlacesCallack = (results, status) => {
        let cleanResults = [];
        if (status == this.props.google.maps.places.PlacesServiceStatus.OK) {
            console.log(results)
            cleanResults = results.map((place, index) => {
                console.log(place);

                return place;

            });
            console.log(cleanResults);

            this.setState({ livePlaces: cleanResults });

        }

    }

    goolgePlacesAPI = (mapProps, map) => {
        this.setState({ map });
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
        let temp = service.nearbySearch(
            { location: { lat: 33.111835, lng: -96.804988 }, radius: 2500, type: ['restaurant'], keyword: 'sushi' },
            this.fetchPlacesCallack
        )

    }

    onMarkerClick = (props, marker) => {
        let place = this.props.offlinePlaces.filter((place) => place.name === props.name)
        console.log(place);
        
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: place[0].name
        });
    }


    render = () => {
        return (
            <Map
                role='application'
                aria-label='map'
                google={this.props.google}
                zoom={14}
                initialCenter={this.props.startMapCenter}
                onReady={this.mapReady}
                offlinePlaces = {this.props.offlinePlaces}
                livePlaces = {this.props.livePlaces}
            >

                {/* {this.state.livePlaces && this.state.livePlaces.map((place, index) =>
                    <Marker
                        key={index}
                        name={place.name}
                        position={place.geometry.location}
                        animation={this.props.google.maps.Animation.DROP}
                        onClick = {this.onMarkerClick}

                    />


                )} */}
                {this.props.offlinePlaces && this.props.offlinePlaces.map((place, index) =>
                    <Marker
                        key={index}
                        name={place.name}
                        position={place.pos}
                        animation={this.props.google.maps.Animation.DROP}
                        onClick = {this.onMarkerClick}
                    />


                )}


                {(this.props.offlinePlaces && !this.state.livePlaces)&& this.props.offlinePlaces.map((place, index) =>
                    <Marker
                        key={index}
                        name={place.name}
                        position={place.pos}
                        animation={this.props.google.maps.Animation.DROP}
                        onClick = {this.onMarkerClick}
                    />


                )}

                <InfoWindow 
                    marker = {this.state.activeMarker}
                    visible = {this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace}</h1>
                    </div>
                </InfoWindow>
            </Map>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyARPBGEvrweLTkN1hfndTYsQDTt-ytv81g')
})(MapCanvas)