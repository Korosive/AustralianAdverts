import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

export class Navigation extends Component {
	constructor() {
		super();
		this.state = {isLoggedIn: false};
	}

	//Upon loading, navigation will check cookies if logged in
	componentDidMount() {
		if (cookie.load('isLoggedIn')) {
			this.setState({
				isLoggedIn: true,
				user_id: cookie.load('user_id')
			});
		}
	}

	render() {
		var nav_accounts;

		if (this.state.isLoggedIn) {
			nav_accounts = (<Fragment>
				<li><Link to={"/profile/" + this.state.user_id}>Profile</Link></li>
			</Fragment>);
		} else {
			nav_accounts = (<Fragment>
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/create/user">Create Account</Link></li>
			</Fragment>);
		}


		return(
			<Fragment>
				<nav>
					<ul>
						<li><Link to="/">Home</Link></li>
						{nav_accounts}
					</ul>
				</nav>
			</Fragment>
		);
	}
}