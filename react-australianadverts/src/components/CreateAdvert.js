import React, {Component, Fragment} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';

export class CreateAdvert extends Component {
	constructor() {
		super();
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = yyyy + "-" + mm + "-" + dd;
		this.state = {currentDate: today, user_id: '', title: '', description: '', start_date: '', end_date: '', payment: ''};

	}

	componentDidMount() {
		if (cookie.load("isLoggedIn")) {
			this.setState({user_id: cookie.load("user_id")});
		} else {
			return(<Redirect to="/login" />);
		}
	}

	handleTitleChange = (e) => {
		e.preventDefault();
		this.setState({title: e.target.value});
	}

	handleDescriptionChange = (e) => {
		e.preventDefault();
		this.setState({description: e.target.value});
	}

	handleStartChange = (e) => {
		e.preventDefault();
		this.setState({start_date: e.target.value});
	}

	handleEndDate = (e) => {
		e.preventDefault();
		this.setState({end_date: e.target.value});
	}

	handlePriceChange = (e) => {
		e.preventDefault();
		this.setState({payment: e.target.value});
	}

	handleReview = (e) => {
		e.preventDefault();
		const destination = {
			pathname: "/review-advert",
			state: {
				referrer: "/create-advert",
				advert: {
					user_id: cookie.load("user_id"),
					title: this.state.title,
					description: this.state.description,
					start_date: this.state.start_date,
					end_date: this.state.end_date,
					payment: this.state.payment
				}
			}
		}
		return(<Redirect from="/create-advert" to={destination} />);
	}

	render() {
		return(
			<Fragment>
				<form>
					<h5>Create Advert</h5>
					<input type="text" 
						placeholder="Title" 
						value={this.state.title}
						onChange={this.handleTitleChange} />
					<textarea placeholder="Description" 
						value={this.state.description}
						onChange={this.handleDescriptionChange} />
					<input type="date"
						min={this.state.currentDate}
						value={this.state.start_date}
						onChange={this.handleStartChange} />
					<input type="date"
						min={this.state.start_date}
						value={this.state.end_date}
						onChange={this.handleEndDate} />
					<input type="number" 
						value={this.state.payment}
						step="0.01"
						min="0" 
						onChange={this.handlePriceChange} />
					<input type="submit"
						value="Proceed with advert"
						onClick={this.handleReview} />
				</form>
			</Fragment>
		);
	}
}