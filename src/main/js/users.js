import axios from 'axios';
import React, {Component} from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

export function register(user) {
	user.myNewField = 'Hello World!';
	return axios.post('/api/user/register', user);
}

export function authenticate(username, password) {
	return axios(
		{
			method: 'post',
			url: '/oauth/token',
			params: {
				'grant_type': 'password',
				username,
				password
			},
			auth: {
				username: 'petfinder-app',
				password: 'petfinder-app-secret'
			}
		}
	).then(response => {
		console.log('here??');
		console.log(response);
		return response;
	}).catch((error) => {
		alert('problem signing in');
		console.log(error);
	});
}

//post pet to PetEndpoint
export function savePet(pet) {
	console.log('here');
	console.log(pet);
    return axios.post('/api/pets', pet).catch((error) => {
		console.log('here???');
		console.log(error);});
}

export function editPet(pet) {
	// alert(pet.id);
	return axios.post('/api/pets/edit_pet', pet);
}

export function confirm(booking) {
	return axios.post('/api/bookings/confirm', booking);
}
export function addAvailiablity(avail) {
	return axios.post('/api/sitters', avail);
}

export function signUpBooking(booking) {
	return axios.post('/api/bookings/signUp', booking);
}

export function makeBooking(booking) {
	return axios.post('/api/bookings', booking);
}

//post pet &user to UserEndpoint
export function addPetUser(petUser) {
	//alert('posting to backend');
    return axios.post('/api/user/pet', petUser).catch((error) => {
		console.log('here???');
		console.log(error);});
}

//get pets assigned to user (UserEndpoint)
export function getPets() {
    return axios.get('/api/user/pet');
}

export function getAvailableSitters(bookingId) {
	return axios.get('/api/sitters/available' + bookingId);
}

export function getPetById(id) {
	return axios.get('/api/pets/' + id);
}

export function approveBooking(sitter, booking) {
	let request = {
		bookingId: booking.id,
		principal: sitter.principal
	};
	console.log('sitter id: ');
	console.log(sitter);
	return axios.post('api/bookings/approve', request);
}

export function getRecommend(id) {
	return axios.get('/api/bookings/recommend'+id);
}

export function getSitter(userid) {
	console.log(userid);

	let res = encodeURI('/api/sitters/'+userid);
	console.log(res);

	return axios.get(res);
}



export function sitterCancel(booking) {
	return axios.post('/api/bookings/sitterCancel', booking);
}

export function finish(booking) {
	return axios.post('/api/bookings/finish', booking);
}

export function getUserDetails() {
	return axios.get('/api/user');
}

export function getInvitation() {
	return axios.get('/api/sitters/invitations');
}

export function cancelBooking(booking) {
	return axios.post('/api/bookings/delete', booking);
}

export function deletePet(pet) {
	return axios.post('/api/pets/delete_pet', pet);
}

export function getNotifications(principal) {

	let res = encodeURI('/api/user/userNotifications'+principal);
	return axios.get(res);
}

export function getBookings(user) {
	return axios.get('/api/user/userBooking', user);
}

export function getSitterBookings() {
	return axios.get('/api/sitters/sitterBookings');
}

export function getAvailableBookings() {
	return axios.get('/api/bookings/openingBooking');
}

export function getRating() {
	return axios.get('/api/rating/rating');
}

export function editProfile(user) {
	return axios.post('/api/user/editProfile', user);
}

export function getSitterInfo(userid) {
	let res = encodeURI('/api/sitters/info'+userid);
	return axios.get(res);
}

export function addRating(booking, content, ratingStar) {
	let res = {
		sitterPrinciple: booking.sitter,
		bookingId: booking.id,
		content: content.rating,
		rating: ratingStar
	};
	console.log('rating: ');
	console.log(res);
	return axios.post('/api/rating', res);
}
export function inviteSitter(sitter, booking) {
	let request = {
		bookingId: booking,
		principal: sitter
	};
	console.log('sitter id: ');
	console.log(sitter);
	return axios.post('api/bookings/invite', request);
}

export function authSecurityAnswer(principal){
    let user = {
        principal: principal
    };
    return axios.get('api/user/securityAnswer', user);
}

let State = {};

State.getAuthentication = state => {
	return state.authentication;
};

State.getSecurityAnswer = state => {
    return state.securityAnswer;
};

State.getNewNoti = state => {
	return state.notis;
};

State.getUser = state => {
	return state.user;
};

State.getPet = state => {
    return state.pet;
};

State.getActivePet = state => {
	return state.activePet;
};

State.getEmail = state => {
	console.log(state);
	return state.activeEmail;
};

State.getActiveBooking = state => {
	return state.activeBooking;
};

State.getPassword = state => {
    return state.password;
};

export { State };

let Actions = {};

Actions.Types = {
	SET_AUTHENTICATION: 'SET_AUTHENTICATION',
	SET_USER: 'SET_USER',
	SET_PET: 'SET_PET',
	SELECT_PET: 'PET_SELECTED',
	SELECT_BOOKING: 'BOOKING_SELECTED',
	SELECT_SITTER: 'SITTER_SELECTED',
	NEW_NOTIS: 'NOTIS_NEW',
	SET_SECURITYANSWER: 'SET_SECURITYANSWER',
	SET_PASSWORD: 'SET_PASSWORD',
	SELECT_EMAIL: 'EMAIL'
};

//save pet
Actions.savePet = pet => {
	//alert('save pet');
	return savePet(pet);
};

Actions.deletePet = pet => {
	return (dispatch) =>
	{
		return deletePet(pet);
	};
};

Actions.editPet = pet => {
	//alert('update pet');
	return (dispatch) => {
		return editPet(pet);
	};
};

Actions.authSecurityAnswer = principal => {
    return (dispatch) => {
        return authSecurityAnswer(principal).then(
            securityAnswer => {
                alert(securityAnswer);
                return dispatch(Actions.setSecurityAnswer(securityAnswer));
        });
    };
};

Actions.setPassword = (password) => {
    alert(password);
    return {type: Actions.Types.SET_PASSWORD, password};
};
// save the relation of pet and user
Actions.addPetUser = (pet, user) => {
	Actions.savePet(pet).then(response =>{
		let petUser = {
			//id : pet.id,
			userPrincipal : user.principal,
			petId : response.id
		};
		addPetUser(petUser);
	});
};

Actions.addAvail = avail => {
	return (dispatch) => {
		return addAvailiablity(avail);
	};
};

Actions.sitterCancel = (booking) => {
	return (dispatch) => {
		return sitterCancel(booking);
	};
};

Actions.finish = booking => {
	return (dispatch) => {
		return finish(booking);
	};
};

Actions.getAvailableSitters = bookingId => {
	return (dispatch) => {
		return getAvailableSitters(bookingId);
	};
};

Actions.makeBooking = booking => {
	return (dispatch) => {
		return makeBooking(booking);
	};
};

Actions.signUpBooking = booking => {
	return (dispatch) => {
		return signUpBooking(booking);
	};
};

Actions.getSitterBookings = () => {
	return (dispatch) => {
		return getSitterBookings();
	};
};

Actions.approveBooking = (sitter, booking) => {
	return (dispatch) => {
		return approveBooking(sitter, booking);
	};
};

Actions.inviteSitter = (sitter, booking) => {
	return (dispatch) => {
		return inviteSitter(sitter, booking);
	};
};

Actions.cancelBooking = booking => {
	return (dispatch) => {
		return cancelBooking(booking);
	};
};

Actions.getInvitation = () => {
	return (dispatch) => {
		return getInvitation();
	};
};

Actions.getPets = pets => {
    return getPets();
};

Actions.getRecommend = bookingId => {
	return getRecommend(bookingId);
};

Actions.getPetById = id => {
	return getPetById(id);
};

Actions.getBookings = user => {
	return getBookings(user);
};

Actions.getNotifications = user => {
	return getNotifications(user.principal);
};

Actions.getAvailableBookings = user => {
	return getAvailableBookings();
};

Actions.addRating = (booking, content, ratingStar) => {
	return (dispatch) => {
		return addRating(booking, content, ratingStar);
	};
};

Actions.getRating = () => {
	return (dispatch) => {
		return getRating();
	};
};

Actions.getSitter = (userid) => {
	return getSitter(userid);
};

Actions.getSitterInfo = (userid) => {
	return getSitterInfo(userid);
};

Actions.register = user => {
	return (dispatch) => {
		return register(user).then(() => {
			return dispatch(Actions.authenticate(user.principal, user.password));
		});
	};
};

Actions.confirm = booking => {
	return (dispatch) => {
		return confirm(booking);
	};
};

Actions.editProfile = user => {
	Actions.setUser(user);
	return (dispatch) => {
		return editProfile(user);
	};
};

Actions.authenticate = (username, password) => {
	return (dispatch) => {
		return authenticate(username, password).then(
			authentication => {
				dispatch(Actions.setAuthentication(authentication));
				return getUserDetails().then(user => {
					dispatch(Actions.setUser(user));
				});
			}
		);
	};
};

Actions.logout = () => {
	return (dispatch) => {
	    localStorage.clear();
		dispatch(Actions.setAuthentication(null));
		dispatch(Actions.setUser(null));
	};
};

Actions.setPet = pet => {
	return {type: Actions.Types.SET_PET, pet};
};

Actions.setAuthentication = authentication => {
	return {type: Actions.Types.SET_AUTHENTICATION, authentication};
};

Actions.setUser = user => {
	return {type: Actions.Types.SET_USER, user};
};

Actions.selectPet = pet => {
	console.log('the pet is clicked!', pet.name);
	return {type: Actions.Types.SELECT_PET, pet};
};

Actions.checkedEmail = email => {
	console.log('email is chosen', email);
	return {type: Actions.Types.SELECT_EMAIL, email};
};

Actions.selectBooking = booking => {
	console.log('the booking is clicked!', booking.id);
	return {type: Actions.Types.SELECT_BOOKING, booking};
};

Actions.selectSitter = sitter => {
	console.log('the booking is clicked!', sitter);
	return {type: Actions.Types.SELECT_SITTER, sitter};
};

Actions.newNotis = notis => {
	console.log('storing notis');
	return {type: Actions.Types.NEW_NOTIS, notis};
};



export { Actions };

let Reducers = {};

Reducers.notis = (noti = null, action) => {
	switch (action.type) {
		case Actions.Types.NEW_NOTIS: {
			return action.notis;
		}
		default: {
			return noti;
		}
	}
};

Reducers.securityAnswer = (securityAnswer = null, action) => {
    switch (action.type) {
        case Actions.Types.SET_SECURITYANSWER:{
            return action.securityAnswer;
        }
        default: {
            return securityAnswer;
        }
    }
};


Reducers.authentication = (authentication = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_AUTHENTICATION: {
		    //in reducer set case Actions.type./ SET_AUTH
            localStorage.setItem('auth', JSON.stringify(authentication));
			return action.authentication;
		}
		default: {
			return authentication;
		}
	}
};

Reducers.user = (user = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_USER: {
			return action.user;
		}
        default: {
			return user;
		}
	}
};

Reducers.pet = (pet = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_PET: {
			return action.pet;
		}
		default: {
			return pet;
		}
	}
};

Reducers.activePet = (activePet = {}, action) => {
	console.log('returning'+ action.type);

	switch (action.type) {

		case Actions.Types.SELECT_PET: {
			return action.pet;
		}
		default: {
			return activePet;
		}
	}
};

Reducers.activeEmail = (activeEmail = {}, action) => {
	console.log('returning'+ action.type);

	switch (action.type) {
		case Actions.Types.SELECT_EMAIL: {
			console.log('rrrr'+ action.email);

			return action.email;
		}
		default: {
			return activeEmail;
		}
	}
};

Reducers.activeBooking = (activeBooking = null, action) => {
	console.log('returning'+ action.type);
	switch (action.type) {

		case Actions.Types.SELECT_BOOKING: {
			return action.booking;
		}
		default: {
			return activeBooking;
		}
	}
};

Reducers.activeSitter = (activeSitter = null, action) => {
	console.log('returning'+ action.type);
	switch (action.type) {

		case Actions.Types.SELECT_SITTER: {
			return action.sitter;
		}
		default: {
			return activeSitter;
		}
	}
};

Reducers.password = (password = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_PASSWORD: {
			return action.password;
		}
		default: {
			return password;
		}
	}
};

export { Reducers };
