import React, { Component } from 'react';
import '../App.css';

// https://developers.google.com/maps/documentation/javascript/events#auth-errors

class GMauthFailure extends Component {

  
    render() {
      return (
        <h1 className='error'>Error loading Google Maps API</h1>
      )
    }
  }
  
  export default GMauthFailure;