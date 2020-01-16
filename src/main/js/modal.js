import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {connect} from 'react-redux';
import * as Users from 'js/users';
import {NavBar} from 'js/navBar';
import {SidebarComponent} from 'js/mySidebar';


export class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentWillMount() {
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                this.setState({sitter: 'SITTER'});
            }
        }
    }

    render() {
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                return (
                    <section>
                        <a href={'#/selectionPane'} className="btn btn1">Start as Pet Sitter</a>
                        <a href={'#/googleMapHome'} onClick={this.toggle} className="btn btn1"> Google Map </a>
                    </section>
                );

            } else if (this.props.user.type === 'OWNER') {
                return (
                    <section>
                        <a href={'#/selectionPane'} className="btn btn1">Start as Pet Owner</a>
                        <a href={'#/googleMapHome'} onClick={this.toggle} className="btn btn1"> Google Map </a>
                    </section>
                );

            } else {
                return (
                    <section>
                        <a href={'#/selectionPane'} className="btn btn1"> Start </a>
                        <a href={'#/googleMapHome'} onClick={this.toggle} className="btn btn1"> Google Map </a>
                    </section>
                );
            }

        } else {
            return (
                <section>
                    <a onClick={this.toggle} className="btn-home btn2"> What is PetFinder? </a>
                    <a onClick={this.toggle} className="btn-home btn2"> Why PetFinder? </a>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog-centered">
                        <div className="mtitle">
                            <ModalHeader toggle={this.toggle}>Begin Your Experience Today</ModalHeader>
                        </div>

                        <ModalBody className="mbody">
                            <div>
                                PetFinder matches pet owners with sitters who request for pet sitting through our
                                website,
                                and owners pay through the website.
                            </div>
                            <div className="space">

                            </div>
                            <div>
                                Sitters make more money
                            </div>

                            <div className="space">

                            </div>
                            <div>
                                Owners have more free time
                            </div>
                        </ModalBody>
                    </Modal>
                </section>
            );
        }
    }
}

MyModal = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user))
    })
)(MyModal);


export class SelectionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentWillMount() {
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                this.setState({sitter: 'SITTER'});
            }
        }
    }

    render() {
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                return (
                    <section className="webWrapper">
                        <SidebarComponent/>
                        <NavBar/>
                        <div className="container padded middleWrapper3">
                            <div className="row">
                                <div className="col-6 offset-md-3" id="p">
                                    <a href={'#/notification'} onClick={this.toggle}
                                       className="btnModal">Notifications</a>
                                    <a href={'#/availableBooking'} onClick={this.toggle} className="btnModal">Active
                                        Bookings
                                    </a>
                                    <a href={'#/signedBooking'} onClick={this.toggle} className="btnModal">Signed
                                        Bookings
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                );

            } else if (this.props.user.type === 'OWNER') {
                return (
                    <section className="webWrapper">
                        <SidebarComponent/>
                        <NavBar/>
                        <div className="container padded middleWrapper3">
                            <div className="row">
                                <div className="col-6 offset-md-3" id="p">
                                    <a href={'#/addBooking'} onClick={this.toggle} className="btnModal">New Booking</a>
                                    <a href={'#/myBooking'} onClick={this.toggle} className="btnModal">My Bookings</a>
                                    <a href={'#/notification'} onClick={this.toggle}
                                       className="btnModal">Notifications</a>
                                </div>
                            </div>
                        </div>
                    </section>
                );

            } else {
                return (
                    <section className="webWrapper">
                        <SidebarComponent/>
                        <NavBar/>
                        <div className="container padded middleWrapper3">
                            <div className="row">
                                <div className="col-6 offset-md-3" id="p">

                                    <a href={'#/addBooking'} onClick={this.toggle} className="btnModal">New
                                        Booking</a>
                                    <a href={'#/myBooking'} onClick={this.toggle} className="btnModal">My
                                        Bookings</a>
                                    <a href={'#/notification'} onClick={this.toggle}
                                       className="btnModal">Notifications</a>
                                    <a href={'#/availableBooking'} onClick={this.toggle} className="btnModal">Active
                                        Bookings
                                    </a>
                                    <a href={'#/signedBooking'} onClick={this.toggle} className="btnModal">Signed
                                        Bookings
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            }
        }
    }
}


SelectionPage = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user))
    })
)(SelectionPage);