
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import * as Pages from 'js/pages';
import * as Users from 'js/users';
import {connect} from 'react-redux';
import _ from 'lodash';
import {PetEdit, PetList} from 'js/petList';
import {MapHome} from 'js/mapHome';
import {BookingFormConfirm} from 'js/bookings/booking';
import {SelectionPage} from 'js/modal';
import {OwnerBookingDetail} from 'js/bookings/BookingDetails';
import {OwnerBookingDetailPage} from 'js/pages';


export default class Index extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		let defaultPage = 0;
		let home = 	<Route exact path="/" component={Pages.Home}/>;
		let register = <Route exact path="/register" component={Pages.RegisterPage}/>;
		let login = <Route exact path="/login" component={Pages.LoginPage}/>;
		let userInfo = <Route exact path="/page-1" component={Pages.Page1}/>;
		let addpet = <Route exact path="/pet" component={Pages.PetForm}/>;
		let page3 = <Route exact path="/page-3" component={Pages.PetListing}/>;
		let homepath = <Route exact path="/homepage" component={Pages.Homepage}/>;
		let logout = <Route exact path="/logout" component={Pages.Logout}/>;
		let editProfile = <Route exact path="/edit_profile" component={Pages.EditProfilePage}/>;
		let schedule = <Route exact path="/schedule" component={Pages.Availability}/>;
		let viewSitter = <Route exact path="/viewSitter" component={Pages.ViewSitter}/>;
		let addBooking = <Route exact path="/addBooking" component={Pages.AddBooking}/>;
		let myBooking = <Route exact path="/myBooking" component={Pages.MyBooking}/>;
		let availableBooking = <Route exact path="/availableBooking" component={Pages.AvailableBooking}/>;
		let bookingDetail = <Route exact path="/bookingDetail" component={Pages.BookingDetailPage}/>;
		let notification = <Route exact path="/notification" component={Pages.Notifications}/>;
		let availableSitters = <Route exact path="/availableSitters" component={Pages.AvailableSittersPage}/>;
		let availableSitters1 = <Route exact path="/availableSitters1" component={Pages.AvailableSittersPage1}/>;
		let availableSitters2 = <Route exact path="/availableSitters2" component={Pages.AvailableSittersPage2}/>;

		let googleMap = <Route exact path="/googleMap" component={Pages.GoogleMap}/>;
		let addRating = <Route exact path="/addRating" component={Pages.AddRating}/>;
        let searchLocation = <Route exact path="/searchLocation" component={Pages.SearchBox}/>;
        let mapHome = <Route exact path="/googleMapHome" component={MapHome}/>;
        let passwordReset = <Route exact path="/passwordReset" component={Pages.PasswordReset}/>;
		let passwordDisplay = <Route exact path="/answerQuestion" component={Pages.AnsweringQuestion}/>;
		let sitterBooking = <Route exact path="/signedBooking" component={Pages.SitterBooking}/>;
		let editPet = <Route exact path="/editPet" component={PetEdit}/>;
		let confirmBooking = <Route exact path="/confirmBooking" component={BookingFormConfirm}/>;
		let selectionPane = <Route exact path="/selectionPane" component={SelectionPage}/>;
		let backgroundTrans = <Route exact path="/transformBackground" component={Pages.TransImage}/>;
		let ownerBookingDetail = <Route exact path="/ownerBookingDetail" component={Pages.OwnerBookingDetailPage}/>;

		//alert(this.props.authentication);
		return (
			<HashRouter>
				<div>
					{ownerBookingDetail}
					{home}
					{register}
					{login}
					{userInfo}
					{addpet}
					{page3}
					{homepath}
					{logout}
					{editProfile}
					{schedule}
					{viewSitter}
					{addBooking}
					{myBooking}
					{availableBooking}
					{bookingDetail}
					{notification}
					{availableSitters}
					{googleMap}
					{addRating}
                    {searchLocation}
					{mapHome}
					{sitterBooking}
					{passwordReset}
					{passwordDisplay}
					{editPet}
					{confirmBooking}
					{selectionPane}
					{backgroundTrans}
					{availableSitters1}
					{availableSitters2}
				</div>
			</HashRouter>
		);

	}
}




