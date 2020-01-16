import React from 'react';
import * as ReduxForm from 'redux-form';

import {connect} from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';
import * as Users from 'js/users';
import classNames from 'classnames';

import * as Apps from 'js/app.js';

import axios from 'axios';
import 'styles/main.scss';

import {Animated} from 'react-animated-css';
import {LocationSearchInput} from 'js/autoComplete';
import {FormText, Input, Label, ModalBody} from 'reactstrap';

export function getRandQuestion() {
    return axios.get('/api/user/getQuestion');
}

export function checkStartingBooking() {
    return axios.get('/api/bookings/getStartingBooking');
}

//Class that represents the log in form
class LoginForm extends React.Component {


    onSubmit = ({principal, password}) => {
        return this.props.authenticate(principal, password);
    };

    render() {
        let {handleSubmit, submitting} = this.props;

        if (submitting) {
            if (this.props.authentication != null) {
                checkStartingBooking().then(response => {
                });
                this.forceUpdate();
                localStorage.setItem('auth', JSON.stringify(this.props.authentication));
                /*if(localStorage.getItem('auth') != null){
                    console.log('got localStorage item');
                    console.log(JSON.parse(localStorage.getItem('auth')));
                    return <Redirect to={'/homepage'}/>;
                }*/
                return <Redirect to={'/'}/>;
            }
        }


        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>

                <Bessemer.Field name="principal" friendlyName="Email"
                                validators={[Validation.requiredValidator, Validation.emailValidator]}/>

                <Bessemer.Field name="password" friendlyName="Password"
                                validators={[Validation.requiredValidator, Validation.passwordValidator]}
                                field={<input className="form-control" type="password"
                                />}/>
                <Label check className="checkBox">
                    <Input type="checkbox" className="Box"/>{' '}
                    Keep me signed in
                </Label>

                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>LOGIN</Bessemer.Button>
                </div>
                <a className="form-left" href={'#/passwordReset'}>Forgot password?</a>
                <a className="form-right" href={'#/register'}>Not a member yet?</a>
            </form>
        );
    }
}

LoginForm = ReduxForm.reduxForm({form: 'login'})(LoginForm);

LoginForm = connect(
    state => ({
        initialValues: {principal: '', password: ''},
        authentication: Users.State.getAuthentication(state)

    }),
    dispatch => ({
        authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
    })
)(LoginForm);

export {LoginForm};

//Class that represents a registration form
class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question: 'default question'
        };
    }

    componentWillMount() {
        getRandQuestion().then(response => {
            this.setState({question: response});
        });
    }

    onSubmit = user => {
        if (user.confirmPassword !== user.password) {
            // alert('password does not match');
        } else if (!user.userType) {
            // alert('must enter a valid user type');
        } else {
            user.securityQuestion = this.state.question;
            return this.props.register(user).then(() => {
                // alert('can not register');
                //and then .catch and redirect in .then
            });
        }
    };

    render() {
        let {handleSubmit, submitting} = this.props;

        if (submitting) {
            this.forceUpdate();
            return <Redirect to={'/'}/>;
        }

        return (
            <form className="regf" name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="principal" friendlyName="Email Address"
                                validators={[Validation.requiredValidator, Validation.emailValidator]}
                />

                <Bessemer.Field name="password" friendlyName="Password"
                                validators={[Validation.requiredValidator, Validation.passwordValidator]}
                                field={<input className="form-control" type="password"
                                />}/>

                <Bessemer.Field name="confirmPassword" friendlyName="Confirm Password"
                                validators={[Validation.requiredValidator, Validation.passwordValidator]}
                                field={<input className="form-control" type="password"
                                />}/>
                <Bessemer.Field name="firstName" friendlyName="First Name"
                                field={<input className="form-control" type="firstName"
                                />}/>

                <Bessemer.Field name="lastName" friendlyName="Last Name"
                                field={<input className="form-control" type="lastName"
                                />}/>
                <Bessemer.Field name="gender" friendlyName="Gender"
                                field={<Bessemer.Select options={[{value: 'female', label: 'Female'},
                                    {value: 'male', label: 'Male'},
                                    {value: 'other', label: 'Other'}]}
                                                        placeholder="Choose Your Gender"
                                />}/>
                <Bessemer.Field name="zipcode" friendlyName="Zip Code"
                                field={<input className="form-control" type="zipcode"/>}/>
                <Bessemer.Field name="userType" friendlyName="User Type"
                                field={<Bessemer.Select options={[{value: 'sitter', label: 'Sitter'},
                                    {value: 'owner', label: 'Owner'}]}
                                                        placeholder="Owner or Sitter?"
                                />}/>
                <div className="secAnswer">
                    Security Question: {' ' + this.state.question}
                </div>

                <Bessemer.Field name="securityAnswer" friendlyName="Answer"
                                field={<input className="form-control" type="securityAnswer"/>}/>

                <FormText className="terms">
                    {'By processing you agree to PetFinder\'s '}
                    <a href={'#/register'}>Terms of Use</a>
                </FormText>

                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>REGISTER</Bessemer.Button>
                </div>
                <div className="middle-align">
                    <a className="form-middle" href={'#/login'}>Already have an account?</a>
                </div>
            </form>
        );
    }
}

RegistrationForm = ReduxForm.reduxForm({form: 'register'})(RegistrationForm);

RegistrationForm = connect(
    state => ({
        initialValues: {password: '', confirmPassword: ''}
    }),

    dispatch => ({
        register: user => dispatch(Users.Actions.register(user))
    })
)(RegistrationForm);


export {RegistrationForm};

class EditProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasSubmitSucceeded: false};
    }

    onSubmit = user => {
        console.log(user);
        if (!user.firstName) {
            alert('please enter a valid first name');
        } else if (!user.lastName) {
            alert('please enter a valid last name');
        } else if (user.gender !== 'male' && user.gender !== 'female' && user.gender !== 'other') {
            alert('please enter a valid gender');
        } else if (user.zipcode.length !== 5) {
            alert('please enter a valid zip code');
        } else {
            let newUser = this.props.user;
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            newUser.gender = user.gender;
            newUser.zipcode = user.zipcode;
            newUser.securityAnswer = user.securityAnswer;
            if (user.userType !== newUser.type) {
                newUser.type = 'BOTH';
            }
            this.props.editProfile(newUser).then(this.setState({hasSubmitSucceeded: true}));
        }

    };

    render() {
        let {handleSubmit, submitting} = this.props;
        if (this.state.hasSubmitSucceeded) {
            //alert('success');
            return <Redirect to={'/'}/>;
        }

        return (
            <div>
                <div className="myR">
                    Your rating is {this.props.user.score + ' stars'}
                </div>

                <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>

                    <Bessemer.Field name="firstName" friendlyName="First Name"
                                    field={<input className="form-control" type="firstName"
                                    />}/>

                    <Bessemer.Field name="lastName" friendlyName="Last Name"
                                    field={<input className="form-control" type="lastName"
                                    />}/>
                    <Bessemer.Field name="gender" friendlyName="Gender"
                                    field={<Bessemer.Select options={[{value: 'female', label: 'Female'},
                                        {value: 'male', label: 'Male'},
                                        {value: 'other', label: 'Other'}]}
                                                            placeholder="Choose Your Gender"
                                    />}/>
                    <Bessemer.Field name="zipcode" friendlyName="Zip Code"
                                    field={<input className="form-control" type="zipcode"/>}/>
                    <Bessemer.Field name="userType" friendlyName="User Type"
                                    field={<Bessemer.Select options={[{value: 'sitter', label: 'Sitter'},
                                        {value: 'owner', label: 'Owner'}]}
                                                            placeholder="Owner or Sitter?"
                                    />}/>


                    <div className="wrapper">
                        <Bessemer.Button className="buttonType1" loading={submitting}>Save Changes</Bessemer.Button>
                    </div>

                </form>
            </div>
        );
    }
}

EditProfileForm = ReduxForm.reduxForm({form: 'edit_profile'})(EditProfileForm);

EditProfileForm = connect(
    state => ({
        initialValues: {
            firstName: Users.State.getUser(state).firstName,
            lastName: Users.State.getUser(state).lastName,
            gender: Users.State.getUser(state).gender,
            zipcode: Users.State.getUser(state).zipcode,
            userType: Users.State.getUser(state).type
        },
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        editProfile: user => dispatch(Users.Actions.editProfile(user))
    })
)(EditProfileForm);

export {EditProfileForm};
