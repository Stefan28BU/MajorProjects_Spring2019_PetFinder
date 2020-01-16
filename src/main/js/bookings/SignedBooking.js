import React from 'react';
import * as Users from 'js/users';
import {Card, CardBody, CardSubtitle, CardTitle, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class SignedBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedBooking: [{
                name: 'no name'
            }]
        };
    }

    componentWillMount() {
        this.props.getSitterBookings().then(response => {
            this.setState({signedBooking: response});
        });
    }

    render() {
        return (
            <div>
                <div className="col-6 offset-md-3" id="p">
                    <div className="title">Signed Bookings</div>
                    {this.state.signedBooking.map(booking => (
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
                                        <CardSubtitle
                                            className="bookingSub">From: {booking.startTime + '   ' + booking.startDate}</CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">To: {booking.endTime + '   ' + booking.endDate}</CardSubtitle>

                                        <div onClick={() => this.props.selectBooking(booking)}>
                                            <a href={'#/BookingDetail'} className="btnModal2">Booking Detail</a>
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

SignedBooking = connect(
    state => ({
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        selectBooking: booking => dispatch(Users.Actions.selectBooking(booking)),
        getSitterBookings: () => dispatch(Users.Actions.getSitterBookings())
    })
)(SignedBooking);

export {SignedBooking};