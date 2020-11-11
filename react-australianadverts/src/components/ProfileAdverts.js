import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

export class ProfileAdverts extends Component {
	constructor() {
		super();
		this.state = {sameUser: false, adverts: [], username: ''};
	}

	componentDidMount() {
		const profile_user = this.props.match.params.user_id;
		if (profile_user) {
			if (cookie.load("isLoggedIn")) {
				if (profile_user == cookie.load("user_id")) {
					this.setState({sameUser: true});
				}
			}

			axios.get("/advert/get/user/" + profile_user)
				.then(response => {
					const data = response.data;
					const adverts = data.advert;
				
					if (data.success) {
						this.setState({message: data.message});
						if (Array.isArray(data.advert) && data.advert) {
							this.setState({data: data.advert});
						} 
					} else {
						this.setState({error: data.message});
					}
				}).catch(error => {
					this.setState({error: "Error has been encountered."});
				});

			axios.get("/users/get/username/" + profile_user)
				.then(response => {
					const data = response.data;
					this.setState({username: data.username});
				}).catch(error => {
					this.setState({errorUsername: error.message});
				});
		} else {
			//Redirect to previous page
			return(<Redirect to="/" />);
		}
	}

	advertOnClick = (id) => {
		return(<Redirect to={"/adverts/" + id} />);
	}

	renderAdverts = () => {
		return(this.state.adverts.map((advert, i) => {
			<Fragment>
				<li key={i}>
					<div onClick={this.advertOnClick}>
						<h5>{advert.title}</h5>
						<small>{"Start date: " + advert.start_date + " | End date: " + advert.end_date + " | Payment: $" + advert.payment}</small>
						<p>{advert.description}</p>
						{this.state.sameUser &&
							<Link to={"/update/advert/" + advert.advert_id}>Update</Link>
						}
					</div>
				</li>
			</Fragment>
		}));
	}

	render() {
		return(
			<Fragment>
				<h1>{this.state.username}'s Adverts</h1>
				<hr />
				<ul>
					{this.renderAdverts}
				</ul>
			</Fragment>
		);
	}
}