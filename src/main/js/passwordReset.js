import React from 'react';
import * as ReduxForm from 'redux-form';

import {connect} from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';
import * as Users from 'js/users';
import classNames from 'classnames';

import * as Apps from 'js/app.js';

import 'styles/main.scss';

import {Animated} from 'react-animated-css';
import {FormText, Input, Label, ModalBody} from 'reactstrap';
import axios from 'axios';

//Class that represents the password reset form
export function checkEmail(email) {
    return axios.post('/api/user/check', email);
}

export function getQuestion(email) {
    return axios.post('/api/user/getQuestion', email);
}

export function checkAndReset(form) {
    return axios.post('/api/user/checkAnswer', form);
}

class PasswordResetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hasSubmitSucceeded: false};
    }

    onSubmit = (form) => {
        alert(form.principal);
        checkEmail(form.principal).then(response => {
            console.log(response);
            if (response === 'found' ) {
                this.props.checkEmail(form.principal);
                this.setState({hasSubmitSucceeded: true});

            }
            else {
                alert('Email not found');
            }
        });
    };

    render() {
        let {handleSubmit, submitting} = this.props;
        if (this.state.hasSubmitSucceeded) {
            alert('submit');
            return <Redirect to={'/answerQuestion'}/>;
        }

        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>

                <Bessemer.Field name="principal" friendlyName="Email"
                                validators={[Validation.requiredValidator, Validation.emailValidator]}/>

                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>Submit</Bessemer.Button>
                </div>
            </form>
        );
    }
}

PasswordResetForm = ReduxForm.reduxForm({form: 'passwordReset'})(PasswordResetForm);

PasswordResetForm = connect(
    state => ({
        initialValues: {principal: '', securityAnswer: '', answer: ''}
    }),
    dispatch => ({
        checkEmail: email => dispatch(Users.Actions.checkedEmail(email))
    })
)(PasswordResetForm);

export {PasswordResetForm};

class AnswerQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasSubmitSucceeded: false,
            question: 'default question'
        };

    }

    onSubmit = (form) => {
        form.principal = this.props.email;
        checkAndReset(form).then(response => {
            console.log(response);
            if (response === 'correct' ) {
                alert('success!');
                this.setState({hasSubmitSucceeded: true});

            }
            else {
                alert('your answer is wrong');
            }
        });
    };

    componentWillMount() {
        console.log('what');
        console.log(this.props.email);
        getQuestion(this.props.email).then(response => {
            this.setState({question: response});
            this.setState({hasSubmitSucceeded: false});
            console.log(response);
        });

    }


    render() {
        let {handleSubmit, submitting} = this.props;
        if (this.state.hasSubmitSucceeded) {
            return <Redirect to={'/login'}/>;
        }
        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <div className="title">{this.state.question}</div>

                <hr/>
                <Bessemer.Field name="answer" friendlyName="Your answer: "
                                field={<input className="form-control" type="answer"
                                />}/>
                <Bessemer.Field name="newPassword" friendlyName="New Password"
                                validators={[Validation.requiredValidator, Validation.passwordValidator]}
                                field={<input className="form-control" type="password"
                                />}/>
                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>Save Changes</Bessemer.Button>
                </div>
            </form>
        );
    }
}

AnswerQuestion = ReduxForm.reduxForm({form: 'AnswerQuestion'})(AnswerQuestion);

AnswerQuestion = connect(
    state => ({
        email: Users.State.getEmail(state)
    })
)(AnswerQuestion);

export {AnswerQuestion};