import React from 'react';
import {
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

import {connect} from 'react-redux';
import * as Users from 'js/users';
import _ from 'lodash';

import UserAvatar from 'react-user-avatar';
import {SidebarComponent} from 'js/mySidebar';

export class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            seconds: 0
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillMount() {
        clearInterval(this.interval);
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                this.setState({sitter: 'SITTER'});
            }
        }
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    render() {
        if (this.props.user) {
            if (this.state.seconds % 10 === 0) {
                // Users.Actions.getNotifications(this.props.user).then(response => {
                //     this.props.getNotis(response);
                // });
                //
                // if (this.props.noti) {
                //     console.log('check');
                //     console.log(this.props.noti);
                // }
                // this.tick();


            }
            if (this.props.user.type === 'SITTER') {
                return (
                    <Navbar light expand="md" className="navBarIn">
                        <h1 className="animated 1 fadeInLeft">
                            <NavbarBrand className="navTitle navTitleHome"
                                         href={'#/'}> Welcome, {this.props.user.firstName} </NavbarBrand>
                        </h1>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#/schedule" className="navText navTextHome">My Schedule</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/viewSitter" className="navText navTextHome">Invitations</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar className="navText navTextHome">
                                    <DropdownToggle nav caret className="navText navTextHome">
                                        More
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <NavItem>
                                            <NavLink href="#/signedBooking" className="">Signed Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/availableBooking" className="">View
                                                Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/notification" className="">Notification</NavLink>
                                        </NavItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>
                                            Reset
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                );
            } else if (this.props.user.type === 'OWNER') {
                return (
                    <Navbar light expand="md" className="navBarIn">
                        <h1 className="animated 1 fadeInLeft">
                            <NavbarBrand className="navTitle navTitleHome"
                                         href={'#/'}> Welcome, {this.props.user.firstName} </NavbarBrand>
                        </h1>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#/page-3" className="navText navTextHome">My Pets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/pet" className="navText navTextHome">Add a Pet</NavLink>
                                </NavItem>

                                <UncontrolledDropdown nav inNavbar className="navText navTextHome">
                                    <DropdownToggle nav caret className="navText navTextHome">
                                        More
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <NavItem>
                                            <NavLink href="#/addBooking" className="">Add Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/myBooking" className="">My Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/notification" className="">Notification</NavLink>
                                        </NavItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>
                                            Reset
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                );
            } else {
                return (
                    <Navbar light expand="md" className="navBarIn">
                        <h1 className="animated 1 fadeInLeft">
                            <NavbarBrand className="navTitle navTitleHome"
                                         href={'#/'}> Welcome, {this.props.user.firstName} </NavbarBrand>
                        </h1>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#/page-3" className="navText navTextHome">My Pets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/pet" className="navText navTextHome">Add a Pet</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/schedule" className="navText navTextHome">My Schedule</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink href="#/viewSitter" className="navText navTextHome">Invitations</NavLink>
                                </NavItem>

                                <UncontrolledDropdown nav inNavbar className="navText navTextHome">
                                    <DropdownToggle nav caret className="navText navTextHome">
                                        More
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <NavItem>
                                            <NavLink href="#/addBooking" className="">Add Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/myBooking" className="">My Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/availableBooking" className="">View
                                                Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/notification" className="">Notification</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/signedBooking" className="">Signed Booking</NavLink>
                                        </NavItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>
                                            Reset
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                );
            }
        } else {
            return (
                <Navbar expand="md" className="homebar">
                    <h1 className="animated 1 fadeInLeft">
                        <NavbarBrand className="navTitle navTitleHome navTitleHomeLeftMargin" href="/">
                            PetFinder{_.isDefined(this.state.seconds)}
                        </NavbarBrand>
                    </h1>

                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#/login" className="navText navTextHome">
                                    LOG IN
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/register" className="navText navTextHome navTextHomeRightMargin">
                                    SIGN UP
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            );
        }
    }
}

NavBar = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        noti: Users.State.getNewNoti(state)
    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user)),
        getNotis: (noti) => dispatch(Users.Actions.newNotis(noti))
    })
)(NavBar);