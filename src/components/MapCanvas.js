import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapCanvas extends Component {
    state = {}

    render = () => {
        return (
            <Map google={this.props.google} zoom={14} >
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