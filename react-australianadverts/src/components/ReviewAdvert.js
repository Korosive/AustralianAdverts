import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';

export class ReviewAdvert extends Component {
	constructor() {
		super();
		this.state = {advert: {}};
	}

	componentDidMount() {
		if (cookie.load("isLoggedIn")) {
			const currentUser = cookie.load("user_id");
			const advert = this.props.location.state.advert;
			if (currentUser === advert.user_id) {
				this.setState({
					title: advert.title,
					description: advert.description,
					start_date: advert.start_date,
					end_date: advert.end_date,
					payment: advert.payment
				});
			} else {
				//Incorrect user
				return(<Redirect to="/" />);
			}
		} else {
			return(<Redirect to="/login" />);
		}
	}

	handleSuccess = (e) => {

	}

	//Add Paypal Button to pay
	render() {
		return(
			<Fragment>
				<div>
					<div>
						<h5>{this.state.title}</h5>
						<small>{"Start: " + this.state.start_date + " | End: " + this.state.end_date} + " | $" + this.start.payment</small>
						<p>{this.state.description}</p>
					</div>
				</div>
			</Fragment>
		);
	}
}