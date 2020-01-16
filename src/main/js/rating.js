import React from 'react';
import {connect} from 'react-redux';

import * as ReduxForm from 'redux-form';


import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';
import * as Users from 'js/users';
import classNames from 'classnames';
import StarRatings from 'react-star-ratings';


import * as Apps from 'js/app.js';

class LeaveRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sitters: [{
                name: 'no name',
                ratingStar: 0
            }]};
    }

    onSubmit = (rating) => {
        return this.props.addRating(this.props.booking, rating, this.state.ratingStar);
    };

    changeRating = ( newRating, name )=> {
        this.setState({
            ratingStar: newRating
        });
    };

    render() {
        let {handleSubmit, submitting} = this.props;

        if (submitting) {
            this.forceUpdate();
            return <Redirect to={'/'}/>;
        }

        return (
            <div>
            <StarRatings
                rating={this.state.ratingStar}
                starRatedColor="blue"
                changeRating={this.changeRating}
                numberOfStars={6}
                name='ratingStar'
            />
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="rating" friendlyName="Leave a Rating"/>
                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>Submit</Bessemer.Button>
                </div>
            </form>
            </div>
        );
    }

}

LeaveRating = ReduxForm.reduxForm({form: 'rating'})(LeaveRating);

LeaveRating = connect(
    state =>({
        booking: Users.State.getActiveBooking(state)
    }),
    dispatch => ({
        addRating: (booking, content, ratingStar) => dispatch(Users.Actions.addRating(booking, content, ratingStar))
    })
)(LeaveRating);

export {LeaveRating};