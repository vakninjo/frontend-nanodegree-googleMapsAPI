import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapCanvas extends Component {
    state = {}
    
    mapReady = (props, map) => {
        // Save the map reference in state and prepare the location markers
        this.setState({map});
    }

    render = () => {
        return (
            <Map
                role='application'
                aria-label='map'
                google={this.props.google} 
                zoom={14}
                initialCenter={{lat:'33.111835', lng:'-96.804988'}}
                onReady= {this.mapReady}
            >
                {/* <Marker onClick={this.onMarkerClick}
                    name={'Current location'} /> */}

                {/* <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow> */}
            </Map>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyARPBGEvrweLTkN1hfndTYsQDTt-ytv81g')
})(MapCanvas)