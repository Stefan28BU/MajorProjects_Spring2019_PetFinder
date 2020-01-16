import React, {Component} from 'react';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/users';
import {Redirect} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';

class PetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hasSubmitSucceeded: false};
    }


    onSubmit = pet => {
        //this.props.addPetUser(pet,this.state.user);
        //alert(this.props.user.principal);
        this.setState({hasSubmitSucceeded: true});
        return Users.Actions.addPetUser(pet, this.props.user);

    };

    render() {
        let {handleSubmit, submitting} = this.props;
        if (this.state.hasSubmitSucceeded) {
            //alert('success');
            // return <Redirect to={'/page-3'}/>;
        }
        function handleClick() {
            toast(<div>Successfully added new pet</div>);
        }

        return (
            <div id="parent">
                    <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                        <Bessemer.Field name="name" friendlyName="Pet Name"
                                        field={<input className="form-control" type="name"/>}/>
                        <Bessemer.Field name="type" friendlyName="Pet Type"
                                        field={<Bessemer.Select options={[{value: 'dog', label: 'Dog'},
                                            {value: 'cat', label: 'Cat'}, {value: 'guinea pig', label: 'Guinea pig'},
                                            {value: 'hamster', label: 'Hamster'}, {value: 'mouse', label: 'Mouse'},
                                            {value: 'rat', label: 'Rat'}, {value: 'gerbil', label: 'Gerbil'},
                                            {value: 'turtle', label: 'Turtle'},
                                            {value: 'frog', label: 'Frog'}, {value: 'lizard', label: 'Lizard'},
                                            {value: 'snake', label: 'Snake'}, {value: 'bird', label: 'Bird'},
                                            {value: 'ferret', label: 'Ferret'}, {value: 'rabbit', label: 'Rabbit'},
                                            {value: 'hedgehog', label: 'Hedgehog'}, {value: 'fish', label: 'Fish'},
                                            {value: 'other', label: 'Other'},]}/>}/>

                        <Bessemer.Field name="preference" friendlyName="Preference"
                                        field={<input className="form-control" type="name"/>}/>

                        <a href={'#/page-3'}>
                            <ToastContainer className="Toaster" position="top-center"/>
                        </a>

                        <div onClick={handleClick} className="wrapper">
                            <Bessemer.Button className="buttonType1" loading={submitting}>Confirm</Bessemer.Button>
                        </div>
                    </form>
            </div>
        );
    }
}


PetForm = ReduxForm.reduxForm({form: 'savePet'})(PetForm);

PetForm = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        //savePet: pet => dispatch(Users.Actions.savePet(pet)),
        addPetUser: pet => dispatch(Users.Actions.addPetUser(pet, this.props.user))
    })
)(PetForm);

export {PetForm};