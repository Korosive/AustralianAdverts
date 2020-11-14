import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

export default class Logout extends Component {
	constructor() {
		super();
		this.state = {status: '', invalid: ''}
	}
	componentDidMount() {
		if (cookie.load("isLoggedIn")) {
			cookie.remove("isLoggedIn");
			cookie.remove("username");
			cookie.remove("user_id");
			this.setState({status: true});
			cookie.save("logout", true);
		} else {
			this.setState({invalid: true});
			cookie.save("invalid", true);
		}	
	}

	render() {
		if (this.state.status || this.state.invalid) {
			return(<Redirect to="/" />);
		}
	}
}