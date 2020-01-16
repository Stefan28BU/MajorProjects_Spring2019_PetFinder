import React from 'react';


import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import GoogleMapReact from 'js/googleMapAPI';

import {Helmet} from 'react-helmet';
import Typekit from 'react-typekit';

import postscribe from 'postscribe';

import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';

import Autocomplete from 'react-google-autocomplete';

import Geocode from 'react-geocode';

import {Map} from 'js/map';

export class MapHome extends React.Component {

    render() {
        return(

            <div style={{ margin: '100px' }}>
                <Map
                    google={this.props.google}
                    center={{lat: 31.5437039, lng: -97.1037349}}
                    height='300px'
                    zoom={15}
                />
            </div>
        );
    }
}