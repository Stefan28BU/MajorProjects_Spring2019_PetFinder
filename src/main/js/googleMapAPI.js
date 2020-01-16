import React from 'react';

import GoogleMapReact from 'google-map-react';

import { } from 'react-places-autocomplete';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import Geocode from 'react-geocode';
import {LocationSearchInput} from 'js/autoComplete';

const AnyReactComponent = ({text}) => <div>{text}</div>;

export class GoogleMapAPI extends React.Component {
    static defaultProps = {
        center: {
            lat: 31.54,
            lng: -97.10
        },
        zoom: 11
    };

    render() {
        return (

            // Important! Always set the container height explicitly
            <div style={{height: '100%', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyCtDc6Y9UHdQHwR--vCIFQ56sLOmlBp2dM'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={31.5437039}
                        lng={-97.1037349}
                        text='My Marker'
                    />
                </GoogleMapReact>
            </div>
        );
    }
}


// export class GoogleMapAPI extends React.Component {
//     render() {
//         return (
//             <Map google={this.props.google} zoom={14}>
//
//                 <Marker onClick={this.onMarkerClick}
//                         name={'Current location'} />
//
//                 <InfoWindow onClose={this.onInfoWindowClose}>
//                     <div>
//                         <h1>{this.state.selectedPlace.name}</h1>
//                     </div>
//                 </InfoWindow>
//             </Map>
//         );
//     }
// }
//
// export default GoogleApiWrapper({
//     apiKey: ('AIzaSyApj8pWzBoBP9_2GjJE2PQnlcp8oanaEdw')
// })(GoogleMapAPI);