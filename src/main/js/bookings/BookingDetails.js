import React from 'react';
import * as Users from 'js/users';
import axios from 'axios';
import {
    Button,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardBody, CardTitle, CardSubtitle, Card, CardText, CardLink
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

export function getSitterAvailablity(sitterId) {
    let res = encodeURI('/api/sitters/' + sitterId);
    return axios.get(res);
}

import {toast, ToastContainer} from 'react-toastify';


class SitterDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pet: [{
                name: 'no name'
            }],
            booking: [{
                name: 'no name'
            }],
            recommend: 'no name'
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        console.log('?');
        console.log(this.props.booking);
        Users.Actions.getPetById(this.props.booking.petId).then(response => {
            console.log('?');
            console.log(response);
            this.setState({pet: response});
        });
    }

    render() {
        function handleClick1() {
            toast(<div>Successfully signed up owner's booking</div>);
        }
        function handleClick2() {
            toast(<div>Successfully added new booking</div>);
        }
        function handleClick3() {
            toast(<div>Successfully added new booking</div>);
        }
        function handleClick4() {
            toast(<div>Successfully added new booking</div>);
        }

        if (this.props.booking.status === 'UNSIGNED') {
            return (
                <div id="p" className="col-6 offset-md-3">

                    <Card style={{
                        width: '500px',
                        height: '300px',
                        margin: '80px 0 80px 0',
                        border: 'none'
                    }}>
                        <div className="cardBody2">
                            <CardBody>
                                <CardTitle>
                                    <div className="bookingDetailTitle">
                                        {this.props.booking.owner}
                                    </div>
                                </CardTitle>
                                <CardSubtitle className="bookingSub">
                                    <div className="petTable petCardMarginBottomSm">
                                        <div className="petCard">
                                            <Card style={{
                                                width: '150px',
                                                height: '80px',
                                                margin: '5px 0 5px 0',
                                                border: 'none',
                                            }}>
                                                <div className="cardBody">
                                                    <CardBody>
                                                        <CardTitle>{' ' + this.state.pet.name + ' '}</CardTitle>
                                                        <CardSubtitle>{' ' + this.state.pet.type + ' '}</CardSubtitle>
                                                        <CardText> {' '} </CardText>
                                                    </CardBody>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </CardSubtitle>
                                {/*<CardSubtitle className="bookingSub">Status: {this.props.booking.status}</CardSubtitle>*/}
                                <CardSubtitle
                                    className="bookingSub">Description: {this.props.booking.description}</CardSubtitle>
                                <CardSubtitle
                                    className="bookingSub">From: {this.props.booking.startTime + '   ' + this.props.booking.startDate}</CardSubtitle>
                                <CardSubtitle
                                    className="bookingSub">To: {this.props.booking.endTime + '   ' + this.props.booking.endDate}</CardSubtitle>
                                <div onClick={handleClick1}>
                                    <a href={'#/signedBooking'}>
                                        <ToastContainer className="Toaster" position="top-center"/>
                                    </a>
                                    <div onClick={() => this.props.signUp(this.props.booking)}>
                                        <a className="btnModal2">Sign Up</a>
                                    </div>
                                </div>
                            </CardBody>
                        </div>
                    </Card>
                </div>
            );
        } else {
            return (
                <div id="p" className="col-6 offset-md-3">
                    <Card style={{
                        width: '500px',
                        height: '300px',
                        margin: '80px 0 80px 0',
                        border: 'none'
                    }}>
                        <div className="cardBody2">
                            <CardBody>
                                <CardTitle>
                                    <div className="bookingDetailTitle">
                                        {this.props.booking.owner}
                                    </div>
                                </CardTitle>
                                <CardSubtitle className="bookingSub">
                                    <div className="petTable petCardMarginBottomSm">
                                        <div className="petCard">
                                            <Card style={{
                                                width: '150px',
                                                height: '80px',
                                                margin: '5px 0 5px 0',
                                                border: 'none',
                                            }}>
                                                <div className="cardBody">
                                                    <CardBody>
                                                        <CardTitle>{' ' + this.state.pet.name + ' '}</CardTitle>
                                                        <CardSubtitle>{' ' + this.state.pet.type + ' '}</CardSubtitle>
                                                        <CardText> {' '} </CardText>
                                                    </CardBody>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </CardSubtitle>
                                {/*<CardSubtitle className="bookingSub">Status: {this.props.booking.status}</CardSubtitle>*/}
                                <CardSubtitle
                                    className="bookingSub">Description: {this.props.booking.description}</CardSubtitle>
                                <CardSubtitle
                                    className="bookingSub">From: {this.props.booking.startTime + '   ' + this.props.booking.startDate}</CardSubtitle>
                                <CardSubtitle
                                    className="bookingSub">To: {this.props.booking.endTime + '   ' + this.props.booking.endDate}</CardSubtitle>
                                <div>

                                    <div onClick={() => this.props.sitterCancel(this.props.booking)}>
                                        <a href={'#/signedBooking'} className="btnModal2">Cancel</a>
                                    </div>
                                </div>
                            </CardBody>
                        </div>
                    </Card>

                    {/*<h2>SITTER: {this.state.pet.name}</h2>*/}
                    {/*<ListGroup>*/}
                    {/*<ListGroupItem>Owner: {this.props.booking.owner}</ListGroupItem>*/}
                    {/*<ListGroupItem>Pet: {this.props.booking.petId}</ListGroupItem>*/}
                    {/*<ListGroupItem>Time: {this.props.booking.time}</ListGroupItem>*/}
                    {/*<ListGroupItem>Des: {this.props.booking.description}</ListGroupItem>*/}
                    {/*<ListGroupItem>Start Time: {this.props.booking.startTime}</ListGroupItem>*/}
                    {/*<ListGroupItem>End Time: {this.props.booking.endTime}</ListGroupItem>*/}
                    {/*<ListGroupItem>Start Date: {this.props.booking.startDate}</ListGroupItem>*/}
                    {/*<ListGroupItem>End Date: {this.props.booking.endDate}</ListGroupItem>*/}
                    {/*</ListGroup>*/}
                    {/*<Link to="/">*/}
                    {/*<Button color="danger" onClick={() => this.props.sitterCancel(this.props.booking)}>Cancel*/}
                    {/*this</Button>*/}
                    {/*</Link>*/}
                </div>
            );
        }
    }
}

SitterDetails = connect(
    state => ({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking)),
        sitterCancel: booking => dispatch(Users.Actions.sitterCancel(booking))

    })
)(SitterDetails);
export {SitterDetails};

class OwnerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pet: [{
                name: 'no name'
            }],
            booking: [{
                name: 'no name'
            }],
            sitter: [{
                locationName: 'no name'
            }],
            sitters: [],
            recommend: 'no name',
            applicant: [{name: 'you dont have any applicant yet'}],
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
        if (this.props.booking.waitingSitter) {
            for (let sitterId of this.props.booking.waitingSitter) {
                Users.Actions.getSitterInfo(sitterId).then(response => {
                    this.state.sitters.push(response);
                });
            }
            console.log('all sitters');

            console.log(this.state.sitters);
        }

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentWillMount() {

        Users.Actions.getPetById(this.props.booking.petId).then(response => {
            this.setState({pet: response});
        });

        getSitterAvailablity(this.props.booking.sitter).then(response => {
            this.setState({sitter: response});
        });
    }

    render() {
        function handleClick1() {
            toast(<div>Successfully signed up owner's booking</div>);
        }
        function handleClick2() {
            toast(<div>Successfully added new booking</div>);
        }
        function handleClick3() {
            toast(<div>Successfully added new booking</div>);
        }
        function handleClick4() {
            toast(<div>Successfully added new booking</div>);
        }


        if (this.props.booking.status === 'SIGNED' || this.props.booking.status === 'FINISHED') {
            if (this.state.sitters.length === 0) {
                return (
                    <div>
                        <div id="p" className="col-6 offset-md-3">
                            <Card style={{
                                width: '500px',
                                height: '300px',
                                margin: '80px 0 80px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody2">
                                    <CardBody>
                                        <CardTitle>
                                            <div className="bookingDetailTitle">
                                                {this.props.booking.owner}
                                            </div>
                                        </CardTitle>
                                        <CardSubtitle className="bookingSub">
                                            <div className="petTable petCardMarginBottomSm">
                                                <div className="petCard">
                                                    <Card style={{
                                                        width: '150px',
                                                        height: '80px',
                                                        margin: '5px 0 5px 0',
                                                        border: 'none',
                                                    }}>
                                                        <div className="cardBody">
                                                            <CardBody>
                                                                <CardTitle>{' ' + this.state.pet.name + ' '}</CardTitle>
                                                                <CardSubtitle>{' ' + this.state.pet.type + ' '}</CardSubtitle>
                                                                <CardText> {' '} </CardText>
                                                            </CardBody>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">Location: {this.props.booking.locationName}
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">Description: {this.props.booking.description}
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">From: {this.props.booking.startTime + '   ' + this.props.booking.startDate}
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">To: {this.props.booking.endTime + '   ' + this.props.booking.endDate}
                                        </CardSubtitle>
                                        <div>

                                            <div onClick={() => this.props.cancel(this.props.booking).then(response => {
                                                // alert('deleting');
                                            })}>
                                                <a href={'#/myBooking'} className="btnModal2">Cancel</a>
                                            </div>

                                            <div>
                                                <a href={'#/availableSitters'} className="btnModal2">Sitters
                                                    Available</a>
                                            </div>

                                            <div onClick={() => this.props.finish(this.props.booking)}>
                                                <a href={'#/addRating'} className="btnModal2">Finish Booking</a>
                                            </div>
                                        </div>
                                    </CardBody>

                                </div>

                            </Card>

                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div id="p" className="col-6 offset-md-3">
                            <Card style={{
                                width: '500px',
                                height: '300px',
                                margin: '80px 0 80px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody2">
                                    <CardBody>
                                        <CardTitle>
                                            <div className="bookingDetailTitle">
                                                {this.props.booking.owner}
                                            </div>
                                        </CardTitle>
                                        <CardSubtitle className="bookingSub">
                                            <div className="petTable petCardMarginBottomSm">
                                                <div className="petCard">
                                                    <Card style={{
                                                        width: '150px',
                                                        height: '80px',
                                                        margin: '5px 0 5px 0',
                                                        border: 'none',
                                                    }}>
                                                        <div className="cardBody">
                                                            <CardBody>
                                                                <CardTitle>{' ' + this.state.pet.name + ' '}</CardTitle>
                                                                <CardSubtitle>{' ' + this.state.pet.type + ' '}</CardSubtitle>
                                                                <CardText> {' '} </CardText>
                                                            </CardBody>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">Location: {this.props.booking.locationName}
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">Description: {this.props.booking.description}</CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">From: {this.props.booking.startTime + '   ' + this.props.booking.startDate}</CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">To: {this.props.booking.endTime + '   ' + this.props.booking.endDate}</CardSubtitle>
                                        <div>

                                            <div onClick={() => this.props.cancel(this.props.booking).then(response => {
                                                // alert('deleting');
                                            })}>
                                                <a href={'#/myBooking'} className="btnModal2">Cancel</a>
                                            </div>

                                            <div onClick={() => this.props.finish(this.props.booking)}>
                                                <a href={'#/addRating'} className="btnModal2">Finish Booking</a>
                                            </div>
                                            <a className="btnModal2" onClick={this.toggle}>Sitter Detail</a>

                                        </div>
                                        {
                                            this.state.sitters.map(sitter => (
                                                <div key={sitter.principal}>
                                                    <Modal isOpen={this.state.modal} toggle={this.toggle}
                                                           className="modal-dialog-centered">
                                                        <div className="mtitle">

                                                            <ModalHeader toggle={this.toggle}>Sitter
                                                                Information</ModalHeader>
                                                        </div>
                                                        <ModalBody className="mbody">
                                                            <div
                                                                className="sitterName">{sitter.firstName + ' ' + sitter.lastName}</div>
                                                            <div>{sitter.principal}</div>
                                                            <div className="space">

                                                            </div>
                                                            <div>Address: {this.state.sitter.locationName}</div>
                                                            <div className="space">

                                                            </div>
                                                            <a href={'#/ownerBookingDetail'} className="btnModal2"
                                                               onClick={() => {

                                                               }}>OK
                                                            </a>

                                                        </ModalBody>
                                                    </Modal>

                                                </div>
                                            ))
                                        }
                                    </CardBody>

                                </div>

                            </Card>

                        </div>
                    </div>
                );
            }
        } else {
            if (this.state.sitters.length === 0) {
                return (
                    <div>
                        <div id="p" className="col-6 offset-md-3">
                            <Card style={{
                                width: '500px',
                                height: '300px',
                                margin: '80px 0 80px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody2">
                                    <CardBody>
                                        <CardTitle>
                                            <div className="bookingDetailTitle">
                                                {this.props.booking.owner}
                                            </div>
                                        </CardTitle>
                                        <CardSubtitle className="bookingSub">
                                            <div className="petTable petCardMarginBottomSm">
                                                <div className="petCard">
                                                    <Card style={{
                                                        width: '150px',
                                                        height: '80px',
                                                        margin: '5px 0 5px 0',
                                                        border: 'none',
                                                    }}>
                                                        <div className="cardBody">
                                                            <CardBody>
                                                                <CardTitle>{' ' + this.state.pet.name + ' '}</CardTitle>
                                                                <CardSubtitle>{' ' + this.state.pet.type + ' '}</CardSubtitle>
                                                                <CardText> {' '} </CardText>
                                                            </CardBody>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">Location: {this.props.booking.locationName}
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">Description: {this.props.booking.description}</CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">From: {this.props.booking.startTime + '   ' + this.props.booking.startDate}</CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">To: {this.props.booking.endTime + '   ' + this.props.booking.endDate}</CardSubtitle>
                                        <div>

                                            <div onClick={() => this.props.cancel(this.props.booking).then(response => {
                                                // alert('deleting');
                                            })}>
                                                <a href={'#/myBooking'} className="btnModal2">Cancel</a>
                                            </div>

                                            <div>
                                                <a href={'#/availableSitters'} className="btnModal2">Sitters
                                                    Available</a>
                                            </div>


                                            <div onClick={handleClick1}>
                                                <a href={'#/signedBooking'}>
                                                    <ToastContainer className="Toaster" position="top-center"/>
                                                </a>
                                                <div onClick={() => this.props.signUp(this.props.booking)}>
                                                    <a className="btnModal2">Sign Up</a>
                                                </div>
                                            </div>

                                            <div onClick={() => this.props.finish(this.props.booking)}>
                                                <a href={'#/addRating'} className="btnModal2">Finish Booking</a>
                                            </div>
                                        </div>
                                    </CardBody>

                                </div>

                            </Card>

                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div id="p" className="col-6 offset-md-3">
                            <Card style={{
                                width: '500px',
                                height: '300px',
                                margin: '80px 0 80px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody2">
                                    <CardBody>
                                        <CardTitle>
                                            <div className="bookingDetailTitle">
                                                {this.props.booking.owner}
                                            </div>
                                        </CardTitle>
                                        <CardSubtitle className="bookingSub">
                                            <div className="petTable petCardMarginBottomSm">
                                                <div className="petCard">
                                                    <Card style={{
                                                        width: '150px',
                                                        height: '80px',
                                                        margin: '5px 0 5px 0',
                                                        border: 'none',
                                                    }}>
                                                        <div className="cardBody">
                                                            <CardBody>
                                                                <CardTitle>{' ' + this.state.pet.name + ' '}</CardTitle>
                                                                <CardSubtitle>{' ' + this.state.pet.type + ' '}</CardSubtitle>
                                                                <CardText> {' '} </CardText>
                                                            </CardBody>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">Location: {this.props.booking.locationName}
                                        </CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">Description: {this.props.booking.description}</CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">From: {this.props.booking.startTime + '   ' + this.props.booking.startDate}</CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">To: {this.props.booking.endTime + '   ' + this.props.booking.endDate}</CardSubtitle>
                                        <div>

                                            <div onClick={() => this.props.cancel(this.props.booking).then(response => {
                                                // alert('deleting');
                                            })}>
                                                <a href={'#/myBooking'} className="btnModal2">Cancel</a>
                                            </div>

                                            <div onClick={() => this.props.finish(this.props.booking)}>
                                                <a href={'#/addRating'} className="btnModal2">Finish Booking</a>
                                            </div>
                                            <a className="btnModal2" onClick={this.toggle}>Sitter Detail</a>
                                            <div onClick={() => this.props.signUp(this.props.booking)}>
                                                <a href={'#/signedBooking'} className="btnModal2">Sign Up</a>
                                            </div>
                                        </div>
                                        {
                                            this.state.sitters.map(sitter => (
                                                <div key={sitter.principal}>
                                                    <Modal isOpen={this.state.modal} toggle={this.toggle}
                                                           className="modal-dialog-centered">
                                                        <div className="mtitle">

                                                            <ModalHeader toggle={this.toggle}>Sitter
                                                                Information</ModalHeader>
                                                        </div>
                                                        <ModalBody className="mbody">
                                                            <div
                                                                className="sitterName">{sitter.firstName + ' ' + sitter.lastName}</div>
                                                            <div>{sitter.principal}</div>
                                                            <div className="space">

                                                            </div>
                                                            <div>Address: {this.state.sitter.locationName}</div>
                                                            <div className="space">

                                                            </div>
                                                            <a href={'#/myBooking'} className="btnModal2"
                                                               onClick={() => {
                                                                   this.props.approve(sitter, this.props.booking);
                                                               }}>Approve
                                                            </a>

                                                        </ModalBody>
                                                    </Modal>

                                                </div>
                                            ))
                                        }
                                    </CardBody>

                                </div>

                            </Card>

                        </div>
                    </div>
                );
            }
        }
    }
}

OwnerDetails = connect(
    state => ({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking)),
        cancel: booking => dispatch(Users.Actions.cancelBooking(booking)),
        approve: (sitter, booking) => dispatch(Users.Actions.approveBooking(sitter, booking)),
        finish: booking => dispatch(Users.Actions.finish(booking))


    })
)(OwnerDetails);
export {OwnerDetails};


class BookingDetail extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            pet: [{
                name: 'no name'
            }],
            booking: [{
                name: 'no name'
            }],
            recommend: 'no name',
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        console.log('?');
        console.log(this.props.booking);
        Users.Actions.getPetById(this.props.booking.petId).then(response => {
            console.log('?');
            console.log(response);
            this.setState({pet: response});
        });

    }

    render() {
        if (!this.props.booking) {
            return (<h1>hmmmmmm</h1>);
        }
        if (this.props.user.type === 'SITTER') {
            console.log('go to sitter');
            return (
                <SitterDetails/>
            );
        } else if (this.props.user.type === 'OWNER') {
            console.log('go to owner');

            return (
                <OwnerDetails/>
            );
        } else {
            console.log('go to both');

            return (
                <OwnerDetails/>
            );
        }

    }
}

BookingDetail = connect(
    state => ({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking))

    })
)(BookingDetail);

export {BookingDetail};

class OwnerBookingDetail extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            pet: [{
                name: 'no name'
            }],
            booking: [{
                name: 'no name'
            }],
            recommend: 'no name',
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        console.log('?');
        console.log(this.props.booking);
        Users.Actions.getPetById(this.props.booking.petId).then(response => {
            console.log('?');
            console.log(response);
            this.setState({pet: response});
        });

    }

    render() {
        if (!this.props.booking) {
            return (<h1>hmmmmmm</h1>);
        }
        if (this.props.user.type === 'SITTER') {
            console.log('go to sitter');
            return (
                <SitterDetails/>
            );
        } else if (this.props.user.type === 'OWNER') {
            console.log('go to owner');

            return (
                <OwnerDetails/>
            );
        } else {
            console.log('go to both');

            return (
                <OwnerDetails/>
            );
        }

    }
}

OwnerBookingDetail = connect(
    state => ({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking))

    })
)(OwnerBookingDetail);

export {OwnerBookingDetail};


