import React, {Component} from 'react';
import * as Users from 'js/users';
import {connect} from 'react-redux';
import {EditProfileForm} from 'js/login';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';

import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardLink
} from 'reactstrap';
import {ScrollArea} from 'react-scrollbar';

import 'react-toastify/dist/ReactToastify.min.css';

import {ToastContainer} from 'react-toastify';

import CustomScroll from 'react-custom-scroll';
import 'react-sticky-table/dist/react-sticky-table.css';
import {StickyTable, Row, Cell} from 'react-sticky-table';


import {SidebarComponent} from 'js/mySidebar';
import {NavBar} from 'js/navBar';

import ReactNotification from 'react-notifications-component';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {toast} from 'react-toastify';


export class PetEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hasSubmitSucceeded: false};
    }


    onSubmit = pet => {
        let newPet = this.props.pet;
        newPet.name = pet.name;
        newPet.type = pet.type;
        newPet.preference = pet.preference;
        this.props.editPet(newPet).then(this.setState({hasSubmitSucceeded: true}));
    };

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };

    render() {

        let {handleSubmit, submitting} = this.props;

        if (!this.props.pet) {
            return (<h1>Select a pet</h1>);
        }

        if (this.state.hasSubmitSucceeded) {
            //alert('success');
            // return <Redirect to={'/page-3'}/>;
        }

        const Greet = ({name}) => <div>Successfully saved {name}</div>;

        function handleClick() {
            toast(<div>Successfully saved changes to pet</div>);
        }

        console.log(this.props.initialValues);
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded middleWrapper3">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Edit Pet</div>
                            <div className="petTable petCardMarginBottom">
                                <div className="petCard">
                                    <Card style={{
                                        width: '150px',
                                        height: '150px',
                                        margin: '5px 0 5px 0',
                                        border: 'none'
                                    }}>
                                        <div className="cardBody">
                                            <CardBody>
                                                <CardTitle>{' ' + this.props.pet.name + ' '}</CardTitle>
                                                <CardSubtitle>{' ' + this.props.pet.type + ' '}</CardSubtitle>
                                                <CardText> {' '} </CardText>
                                                <CardLink className="cardLinkMiddle2"
                                                          href={'#/page-3'}>Change</CardLink>
                                            </CardBody>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                                <Bessemer.Field name="name" friendlyName="Pet Name" value="????"
                                                className="form-control"/>

                                <Bessemer.Field name="type" friendlyName="Pet Type"
                                                field={<Bessemer.Select options={[{value: 'dog', label: 'Dog'},
                                                    {value: 'cat', label: 'Cat'}, {
                                                        value: 'guinea pig',
                                                        label: 'Guinea pig'
                                                    },
                                                    {value: 'hamster', label: 'Hamster'}, {
                                                        value: 'mouse',
                                                        label: 'Mouse'
                                                    },
                                                    {value: 'rat', label: 'Rat'}, {value: 'gerbil', label: 'Gerbil'},
                                                    {value: 'turtle', label: 'Turtle'},
                                                    {value: 'frog', label: 'Frog'}, {value: 'lizard', label: 'Lizard'},
                                                    {value: 'snake', label: 'Snake'}, {value: 'bird', label: 'Bird'},
                                                    {value: 'ferret', label: 'Ferret'}, {
                                                        value: 'rabbit',
                                                        label: 'Rabbit'
                                                    },
                                                    {value: 'hedgehog', label: 'Hedgehog'}, {
                                                        value: 'fish',
                                                        label: 'Fish'
                                                    },
                                                    {value: 'other', label: 'Other'},]}/>}
                                />
                                <Bessemer.Field name="preference" friendlyName="Preference" value="???"
                                                className="form-control"/>
                                {/*// field={<input className="form-control" type="name"/>}/>*/}
                                <div className="wrapper">
                                    <div onClick={handleClick}>
                                        <Bessemer.Button className="buttonType1" loading={submitting}>
                                            Save Changes
                                        </Bessemer.Button>
                                    </div>
                                </div>
                                <a href={'#/page-3'}>
                                    <ToastContainer className="Toaster" position="top-center"/>
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

PetEdit = ReduxForm.reduxForm({form: 'petEdit'})(PetEdit);


PetEdit = connect(
    state => ({
        initialValues: {
            name: Users.State.getActivePet(state).name,
            type: Users.State.getActivePet(state).type,
            preference: Users.State.getActivePet(state).preference
        },
        pet: Users.State.getActivePet(state)
    }),
    dispatch => ({
        editPet: pet => dispatch(Users.Actions.editPet(pet))
    })
)(PetEdit);


export class PetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [{
                name: 'no name'
            }],
            deleted: false,
            myVar: false
        };
    }

    handleClick() {
        // let newPet = this.props.pet;
        // newPet.name = pet.name;
        // newPet.type = pet.type;
        // newPet.preference = pet.preference;
        this.setState({deleted: true});
    }

    //set state as array of user's pets
    componentWillMount() {
        Users.Actions.getPets().then(response => {
            this.setState({pets: response});
            console.log('size ' + this.state.pets.length);
        });
    }

    render() {
        let {handleSubmit, submitting} = this.props;

        if (this.state.deleted) {
            //alert('success');
            return <Redirect to={'/page-3'}/>;
        }

        return (
            <div className="petTable">
                {this.state.pets.map(pet => (
                    // !this.state.deleted && this.props.pet.id === pet.id(
                    <div className="petCard" key={pet.id} onClick={() => this.props.selectPet(pet)}>

                        <Card style={{
                            width: '150px',
                            height: '150px',
                            margin: '5px 0 5px 0',
                            border: 'none'
                        }}>
                            <div className="cardBody">
                                <CardBody>
                                    <CardTitle>{' ' + pet.name + ' '}</CardTitle>
                                    <CardSubtitle>{' ' + pet.type + ' '}</CardSubtitle>
                                    <CardText> {' '} </CardText>
                                    <CardLink className="cardLinkLeft" href={'#/editPet'}>Edit</CardLink>

                                    <CardLink className="cardLinkRight" href={'#/'}>Delete</CardLink>
                                </CardBody>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

        );
    }
}

PetList = connect(
    state => ({}),
    dispatch => ({
        selectPet: pet => dispatch(Users.Actions.selectPet(pet))
    })
)(PetList);




