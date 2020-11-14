import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

export default class Logout extends Component {
	componentDidMount() {
		if (cookie.load("isLoggedIn")) {
			cookie.remove("user_id");
			cookie.remove("usernamme");
			cookie.remove("isLoggedIn");
			cookie.save("logout", true);
		} else {
			cookie.save("invalid_logout", true);
		}
		window.location.reload();
	}
	
	render() {
		return(<Redirect to="/" />);
	}
}