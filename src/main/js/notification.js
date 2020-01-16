import React, {Component} from 'react';
import * as ReduxForm from 'redux-form';
import axios from 'axios';
import {connect} from 'react-redux';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/users';
import {Link, Redirect} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'reactstrap';

export function readNotification(id) {
    axios.post('/api/notification/read', id);
}

class NotificationCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [{
                name: 'no name'
            }]
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        Users.Actions.getNotifications(this.props.user).then(response => {
            console.log('?');
            console.log(response);
            this.setState({notifications: response});
        });

    }

    render () {
        return (
            <div>
                <div id="p" className="col-6 offset-md-3">
                    <div className="title">Notifications</div>
                    {this.state.notifications.map(noti =>(
                        <ListGroup>
                            <ListGroupItem className="blackText">{noti.info}</ListGroupItem>
                        </ListGroup>
                    ))}
                </div>
            </div>
        );
    }
}

NotificationCenter = connect(
    state =>({
        user: Users.State.getUser(state)
    }),
    dispatch =>({

    })
)(NotificationCenter);

export {NotificationCenter};