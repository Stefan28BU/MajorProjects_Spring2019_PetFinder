import React from 'react';
import * as Users from 'js/users';
import {Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class MyBookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: [{
                name: 'no name'
            }]
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        Users.Actions.getBookings(this.props.user).then(response => {
            this.setState({booking: response});
        });
    }

    render() {
        return (
            <div>
                <div id="p" className="col-6 offset-md-3">
                    <div className="title">My Bookings</div>
                    {this.state.booking.map(booking => (
                        <ListGroup key={booking.id}>

                            <Card style={{
                                width: '500px',
                                height: '300px',
                                margin: '30px 0 50px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody2">
                                    <CardBody>
                                        <CardTitle>
                                            <div className="bookingDetailTitle">
                                                <div> {booking.time}</div>

                                            </div>
                                        </CardTitle>
                                        <CardSubtitle className="bookingSub">Status: {booking.status}</CardSubtitle>
                                        <CardSubtitle className="bookingSub">From: {booking.startTime + '   ' + booking.startDate}</CardSubtitle>
                                        <CardSubtitle className="bookingSub">To: {booking.endTime + '   ' +booking.endDate}</CardSubtitle>

                                        <div onClick={() => this.props.selectBooking(booking)}>

                                            <a href={'#/ownerBookingDetail'} className="btnModal2">Booking Detail</a>
                                        </div>

                                    </CardBody>
                                </div>
                            </Card>

                        </ListGroup>
                    ))}

                </div>
            </div>
        );
    }


}

MyBookings = connect(
    state => ({
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        selectBooking: booking => dispatch(Users.Actions.selectBooking(booking))
    })
)(MyBookings);

export {MyBookings};