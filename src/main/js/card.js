import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardLink
} from 'reactstrap';
import {connect} from 'react-redux';
import * as Users from 'js/users';

export class MyCard extends React.Component {
    constructor(props) {
        super(props);

        //
        // this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                this.setState({sitter: 'SITTER'});
            }
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>{this.props.user.firstName}</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText/>asd <CardText/>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    }
}


MyCard = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        noti: Users.State.getNewNoti(state)
    }),



    // sitterId => ({
    //     sitter: Users.Actions.getSitter(sitterId),
    //     availableSitters: Users.Actions.getAvailableSitters(sitterId)
    // }),

    dispatch => ({
        register: user => dispatch(Users.Actions.register(user)),
        getNotis: (noti) => dispatch(Users.Actions.newNotis(noti))
    })
)(MyCard);