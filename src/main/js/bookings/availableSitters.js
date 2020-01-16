import React from 'react';
import * as ReduxForm from 'redux-form';

import {connect} from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Link, Redirect} from 'react-router-dom';
import * as Users from 'js/users';
import classNames from 'classnames';

import * as Apps from 'js/app.js';
import Avatar from 'react-avatar';

import 'styles/main.scss';

import {Animated} from 'react-animated-css';
import {AvailableBooking} from 'js/bookings/booking';
import {Button, Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle, ListGroupItem} from 'reactstrap';

import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';

// available sitter
class AvailableSitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitters: null
        };
    }

    componentWillMount() {
        // get all sitters and store
        this.props.getAvailableSitters(this.props.booking.id).then(response => {
            console.log(response);
            this.setState({sitters: response});
        });

    }


    render() {
        console.log('xxxx');
        if (!this.state.sitters) {
            return (
                <div><h2>Pet finder could not find any matching sitters</h2></div>
            );
        }

        function handleClick() {
            // send confirm notification
            toast(<div>Successfully invited sitter</div>);
        }

        return (
            <div>
                <div className="title">Available Sitters</div>
                <div className="petTable petCardMarginBottom">

                    <div className="sortPane">
                        <a className="sortLink" href={'#/availableSitters'}>
                            Sort by time
                        </a>
                        <a className="sortLink" href={'#/availableSitters1'}>
                            Sort by distance
                        </a>
                        <a className="sortLink" href={'#/availableSitters2'}>
                            Sort by rating
                        </a>
                    </div>
                    {this.state.sitters.map(sitterDate => (
                        <div className="invCard">

                            <Card style={{
                                minWidth: '500px',
                                width: '500px',
                                height: '150px',
                                margin: '5px 0 5px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody2">
                                    <CardBody>
                                        {sitterDate.sitter.firstName === 'Ricardo' &&
                                        <div className="invAvar">
                                            <Avatar
                                                name={sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}
                                                size={70} round={true}

                                                src={'data:image/jpeg;base64,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'}
                                            />
                                        </div>
                                        }

                                        {sitterDate.sitter.firstName !== 'Ricardo'  &&
                                        <div className="invAvar">
                                            <Avatar
                                                name={sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}
                                                size={70} round={true}
                                            />
                                        </div>
                                        }

                                        <CardTitle>{sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}</CardTitle>

                                        <div className="cb">
                                            <div className="stars">
                                                {sitterDate.sitter.score + ' stars'}
                                            </div>

                                            <CardSubtitle>{sitterDate.distance.toFixed(1) + ' miles away from you'}</CardSubtitle>
                                            <CardText> {sitterDate.sitter.firstName + ' is available between'} </CardText>
                                            <CardText> {sitterDate.availability.startDate + ' ' + sitterDate.availability.startTime + ' to ' + sitterDate.availability.endDate + ' ' + sitterDate.availability.endTime} </CardText>
                                            <a href={'#/myBooking'}>
                                                <ToastContainer className="Toaster" position="top-center"/>
                                            </a>

                                            <div onClick={handleClick}>
                                                <div onClick={() => {
                                                    this.props.invite(sitterDate.sitter.principal, this.props.booking.id);
                                                }}>
                                                    <a className="btnModal2">Invite</a>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </div>
                            </Card>

                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

AvailableSitter = connect(
    state => ({
        booking: Users.State.getActiveBooking(state)
    }),
    dispatch => ({
        getAvailableSitters: bookingID => dispatch(Users.Actions.getAvailableSitters(bookingID)),
        invite: (sitter, bookingId) => dispatch(Users.Actions.inviteSitter(sitter, bookingId))
    })
)(AvailableSitter);

export {AvailableSitter};
// different endpoint call
export function getAvailableSittersDistance(bookingId) {
    return axios.get('/api/sitters/availableA' + bookingId);
}

export function getAvailableSittersRating(bookingId) {
    return axios.get('/api/sitters/availableR' + bookingId);
}


class AvailableSitter1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitters: null
        };
    }


    componentWillMount() {
        getAvailableSittersDistance(this.props.booking.id).then(response => {
            console.log(response);
            this.setState({sitters: response});
        });

    }


    render() {
        console.log('xxxx');
        if (!this.state.sitters) {
            return (
                <div><h2>Pet finder could not find any matching sitters</h2></div>
            );
        }

        function handleClick() {
            toast(<div>Successfully invited sitter</div>);
        }

        return (
            <div>
                <div className="title">Available Sitters</div>
                <div className="petTable petCardMarginBottom">
                    <div className="sortPane">
                        <a className="sortLink" href={'#/availableSitters'}>
                            Sort by time
                        </a>
                        <a className="sortLink" href={'#/availableSitters1'}>
                            Sort by distance
                        </a>
                        <a className="sortLink" href={'#/availableSitters2'}>
                            Sort by rating
                        </a>
                    </div>

                    {this.state.sitters.map(sitterDate => (
                        <div className="invCard">

                            <Card style={{
                                minWidth: '500px',
                                width: '500px',
                                height: '150px',
                                margin: '5px 0 5px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody2">
                                    <CardBody>
                                        {sitterDate.sitter.firstName === 'Ricardo' &&
                                        <div className="invAvar">
                                            <Avatar
                                                name={sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}
                                                size={70} round={true}

                                                src={'data:image/jpeg;base64,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'}
                                            />
                                        </div>
                                        }

                                        {sitterDate.sitter.firstName !== 'Ricardo'  &&
                                        <div className="invAvar">
                                            <Avatar
                                                name={sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}
                                                size={70} round={true}
                                            />
                                        </div>
                                        }


                                        <CardTitle>{sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}</CardTitle>

                                        <div className="cb">
                                            <div className="stars">
                                                {sitterDate.sitter.score + ' stars'}
                                            </div>
                                            <CardSubtitle>{sitterDate.distance.toFixed(1) + ' miles away from you'}</CardSubtitle>
                                            <CardText> {sitterDate.sitter.firstName + ' is available between'} </CardText>
                                            <CardText> {sitterDate.availability.startDate + ' ' + sitterDate.availability.startTime + ' to ' + sitterDate.availability.endDate + ' ' + sitterDate.availability.endTime} </CardText>
                                            <a href={'#/myBooking'}>
                                                <ToastContainer className="Toaster" position="top-center"/>
                                            </a>

                                            <div onClick={handleClick}>
                                                <div onClick={() => {
                                                    this.props.invite(sitterDate.sitter.principal, this.props.booking.id);
                                                }}>
                                                    <a className="btnModal2">Invite</a>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </div>
                            </Card>

                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

AvailableSitter1 = connect(
    state => ({
        booking: Users.State.getActiveBooking(state)
    }),
    dispatch => ({
        getAvailableSitters: bookingID => dispatch(Users.Actions.getAvailableSitters(bookingID)),
        invite: (sitter, bookingId) => dispatch(Users.Actions.inviteSitter(sitter, bookingId))
    })
)(AvailableSitter1);

export {AvailableSitter1};

class AvailableSitter2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitters: null
        };
    }


    componentWillMount() {
        getAvailableSittersRating(this.props.booking.id).then(response => {
            console.log(response);
            this.setState({sitters: response});
        });

    }


    render() {
        console.log('xxxx');
        if (!this.state.sitters) {
            return (
                <div><h2>Pet finder could not find any matching sitters</h2></div>
            );
        }

        function handleClick() {
            toast(<div>Successfully invited sitter</div>);
        }

        return (
            <div>
                <div className="title">Available Sitters</div>
                <div className="petTable petCardMarginBottom">
                    <div className="sortPane">
                        <a className="sortLink" href={'#/availableSitters'}>
                            Sort by time
                        </a>
                        <a className="sortLink" href={'#/availableSitters1'}>
                            Sort by distance
                        </a>
                        <a className="sortLink" href={'#/availableSitters2'}>
                            Sort by rating
                        </a>
                    </div>
                    {this.state.sitters.map(sitterDate => (
                        <div className="invCard">

                            <Card style={{
                                minWidth: '500px',
                                width: '500px',
                                height: '150px',
                                margin: '5px 0 5px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody2">
                                    <CardBody>
                                        {sitterDate.sitter.firstName === 'Ricardo' &&
                                        <div className="invAvar">
                                            <Avatar
                                                name={sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}
                                                size={70} round={true}

                                                src={'data:image/jpeg;base64,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'}
                                            />
                                        </div>
                                        }

                                        {sitterDate.sitter.firstName !== 'Ricardo'  &&
                                        <div className="invAvar">
                                            <Avatar
                                                name={sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}
                                                size={70} round={true}
                                            />
                                        </div>
                                        }
                                        <CardTitle>{sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}</CardTitle>

                                        <div className="cb">
                                            <div className="stars">
                                                {sitterDate.sitter.score + ' stars'}
                                            </div>
                                            <CardSubtitle>{sitterDate.distance.toFixed(1) + ' miles away from you'}</CardSubtitle>
                                            <CardText> {sitterDate.sitter.firstName + ' is available between'} </CardText>
                                            <CardText> {sitterDate.availability.startDate + ' ' + sitterDate.availability.startTime + ' to ' + sitterDate.availability.endDate + ' ' + sitterDate.availability.endTime} </CardText>
                                            <a href={'#/myBooking'}>
                                                <ToastContainer className="Toaster" position="top-center"/>
                                            </a>

                                            <div onClick={handleClick}>
                                                <div onClick={() => {
                                                    this.props.invite(sitterDate.sitter.principal, this.props.booking.id);
                                                }}>
                                                    <a className="btnModal2">Invite</a>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </div>
                            </Card>

                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

AvailableSitter2 = connect(
    state => ({
        booking: Users.State.getActiveBooking(state)
    }),
    dispatch => ({
        getAvailableSitters: bookingID => dispatch(Users.Actions.getAvailableSitters(bookingID)),
        invite: (sitter, bookingId) => dispatch(Users.Actions.inviteSitter(sitter, bookingId))
    })
)(AvailableSitter2);

export {AvailableSitter2};

