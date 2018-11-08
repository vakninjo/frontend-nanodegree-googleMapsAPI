import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapCanvas extends Component {
    state = {
        map: null,
        markers: [],
        markerPops: [],
        activeMarker: null,
        selectedPlace: null,
        showingInfoWindow: false


    }

    mapReady = (mapProps, map) => {
        // Save the map reference in state and prepare the location markers
        this.setState({ map }, this.goolgePlacesAPI(mapProps, map));

    }

    onInfoWindowClose = () => {
        this.setState({ showingInfoWindow: false, activeMarker: null, activeMarkerProps: null });
    }

    onMarkerClick = (props, marker) => {
        //close open info windows
        this.onInfoWindowClose();
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props
        })
        // console.log(this.state.livePlaces)
        // const {temp} = this.state.livePlaces
        // const detailedPlace = new this.props.google.maps.places.PlacesService(this.props.map);
        // detailedPlace.getDetails(
        //     {
        //         placeId: props.place_id
        //     },this.detailedPlaceCallback
        // )

}

    // detailedPlaceCallback = (results, status) => {
    //     let detailedResults = [];
    //     if (status == this.props.google.maps.places.PlacesServiceStatus.OK) {
    //         // console.log(results)
    //         detailedResults = results.map((place, index) => {
    //             // console.log(place);

    //             return place;

    //         });
    //         console.log(JSON.stringify(detailedResults));

    //         this.setState({ liveDetailedPlaces: detailedResults }, () => console.log('liveEndfetch ' + this.state.livePlaces));


    //     }

    // }

    fetchPlacesCallack = (results, status) => {
        let cleanResults = [];
        if (status == this.props.google.maps.places.PlacesServiceStatus.OK) {
            // console.log(results)
            cleanResults = results.map((place, index) => {
                // console.log(place);

                return place;

            });
            console.log(JSON.stringify(cleanResults));

            this.setState({ livePlaces: cleanResults }, () => console.log('liveEndfetch ' + this.state.livePlaces));


        }

    }

    goolgePlacesAPI = (mapProps, map) => {
        this.setState({ map });
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(
            { location: { lat: 33.111835, lng: -96.804988 }, radius: 1500, type: ['restaurant'], keyword: 'sushi' },
            this.fetchPlacesCallack

        )


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
                offlinePlaces={this.props.offlinePlaces}
                livePlaces={this.state.livePlaces}
            >

                {this.state.livePlaces && this.state.livePlaces.map((place, index) =>
                    <Marker
                        key={index}
                        name={place.name}
                        position={place.geometry.location}
                        animation={this.props.google.maps.Animation.DROP}
                        url={place.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 100 })}
                        placeId={place.place_id}
                        placeRating={place.rating}
                        onClick={this.onMarkerClick}

                    />
                )}
                {/* {this.props.offlinePlaces && this.props.offlinePlaces.map((place, index) =>
                    <Marker
                        key={index}
                        name={place.name}
                        position={place.pos}
                        animation={this.props.google.maps.Animation.DROP}
                        onClick={this.onMarkerClick}
                    />


                )}


                {(this.props.pofflinePlaces && !this.state.livePlaces) && this.props.pofflinePlaces.map((place, index) =>
                    <Marker
                        key={index}
                        name={place.name}
                        position={place.pos}
                        animation={this.props.google.maps.Animation.DROP}
                        onClick={this.onMarkerClick}
                    />


                )} */}

                <InfoWindow
                    
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    offlinePlaces={this.props.offlinePlaces}
                    livePlaces={this.state.livePlaces}
                    onClose={this.onInfoWindowClose}>
                    {/* {Object.keys(this.state.selectedPlace).map((data,index) =>  */}
                    <div className="info-window">
                        <h1> {this.state.selectedPlace && this.state.selectedPlace.name}</h1>
                        <h3> Raiting: {this.state.activeMarker && this.state.activeMarker.placeRating}</h3>
                        {/* <p>{this.state.activeMarker && `url(${this.state.activeMarker.url})`}</p> */}
                        <img src={this.state.activeMarker && this.state.activeMarker.url} alt="Photo of place by Google"></img>
                        <a href={this.state.activeMarker && this.state.activeMarker.url}>Photos by Google</a>
                    </div>
                    {/* )} */}

                </InfoWindow>
            </Map>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyARPBGEvrweLTkN1hfndTYsQDTt-ytv81g')
})(MapCanvas)