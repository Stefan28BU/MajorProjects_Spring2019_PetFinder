import React from 'react';
import {Redirect} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import * as Users from 'js/users';
import 'styles/main.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Geocode from 'react-geocode';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {toast, ToastContainer} from 'react-toastify';

class AvailabilityForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            address: '',
            lati: '',
            lngi: ''

        };

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);

    }

    handleChange1(date) {
        console.log('+');
        console.log(date);
        this.setState({
            startTime: date,
        });
    }

    handleChange2(date) {
        this.setState({
            endTime: date,
        });
    }

    handleChange3(date) {
        this.setState({
            startDate: date,
        });
    }

    handleChange4(date) {
        this.setState({
            endDate: date,
        });
    }

    handleChange = address => {
        this.setState({address});
        console.log(this.state.address);

    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => {
                getLatLng(results[0]);
                console.log('ppp');
                console.log(results);
                console.log(results[0].formatted_address);
                this.setState({address: results[0].formatted_address});
                Geocode.fromAddress(results[0].formatted_address).then(
                    response => {
                        const {lat, lng} = response.results[0].geometry.location;
                        console.log(lat, lng);
                        this.setState({lati: lat, lngi: lng});
                    },
                    error => {
                        console.error(error);
                    }
                );
            })
            .then(latLng => {
                console.log('Success', latLng);
            })
            .catch(error => console.error('Error', error));
    };

    state = {
        gmapsLoaded: false,
    };

    initMap = () => {
        this.setState({
            gmapsLoaded: true,
        });
    };

    componentDidMount() {
        window.initMap = this.initMap;
        const gmapScriptEl = document.createElement('script');
        gmapScriptEl.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCtDc6Y9UHdQHwR--vCIFQ56sLOmlBp2dM&libraries=places&callback=initMap';
        document.querySelector('body').insertAdjacentElement('beforeend', gmapScriptEl);
    }


    //Defines the on submit behavior
    onSubmit = (form) => {
        if (form.availability.length <= 2) {
            alert('Please enter at least 2 characters');
        } else {
            let avail = {
                principal: this.props.user.principal,
                availability: form.availability,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                locationName: this.state.address,
                lat: this.state.lati,
                lng: this.state.lngi
            };
            console.log('here');
            console.log(avail);
            return this.props.addAvail(avail);
        }
    };


    render() {
        let {handleSubmit, submitting} = this.props;

        if (submitting) {
            if (this.props.authentication != null) {
                // this.forceUpdate();
                // return <Redirect to={'/'}/>;
            }
        }

        function handleClick() {
            toast(<div>Successfully updated schedule</div>);
        }


        return (
            <div className="row">
                <div className="col-6 offset-md-3" id="p">
                    <h1 className="title">Enter Your Availability</h1>
                    <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                        <Bessemer.Field name="availability" friendlyName="More Detail"/>
                        <div className="dateTagWrapper">
                            <div className="fromTime">From
                                <DatePicker className="dpBoxLeft"
                                            selected={this.state.startDate}
                                            selectsStart
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onChange={this.handleChange3}
                                            dateFormat="MM-dd-yyyy"
                                            placeholderText={'Start Date...'}

                                />
                                <DatePicker className="dpBox"
                                            selected={this.state.startTime}
                                            onChange={this.handleChange1}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            dateFormat="h:mm aa"
                                            timeCaption="Time"
                                            placeholderText={'Start Time...'}
                                />
                            </div>
                            <div className="toTime">To
                                <DatePicker className="dpBoxLeft2"
                                            selected={this.state.endDate}
                                            selectsEnd
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onChange={this.handleChange4}
                                            dateFormat="MM-dd-yyyy"
                                            placeholderText={'End Date...'}
                                />
                                <DatePicker className="dpBox"
                                            selected={this.state.endTime}
                                            onChange={this.handleChange2}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            dateFormat="h:mm aa"
                                            timeCaption="Time"
                                            placeholderText={'End Time...'}
                                />
                            </div>
                        </div>
                        {this.state.gmapsLoaded && (
                            <div className="searchBoxGoogle">

                                <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
                                >
                                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                        <div>
                                            <input className="inputSearch"
                                                   {...getInputProps({
                                                       placeholder: 'Enter Your Address Here',
                                                       className: 'location-search-input form-control',
                                                   })}
                                            />
                                            <div className="autocomplete-dropdown-container adc">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? {backgroundColor: 'black', cursor: 'pointer'}
                                                        : {backgroundColor: '#434343', cursor: 'pointer'};
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                        )}
                        <a href={'#/viewSitter'}>
                            <ToastContainer className="Toaster" position="top-center"/>
                        </a>

                        <div onClick={handleClick} className="wrapper">
                            <Bessemer.Button className="buttonType1" loading={submitting}>Confirm</Bessemer.Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AvailabilityForm = ReduxForm.reduxForm({form: 'availability'})(AvailabilityForm);

AvailabilityForm = connect(
    state => ({
        initialValues: {principal: '', password: ''},
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)

    }),
    dispatch => ({
        addAvail: (avail) => dispatch(Users.Actions.addAvail(avail))
    })
)(AvailabilityForm);

export {AvailabilityForm};



