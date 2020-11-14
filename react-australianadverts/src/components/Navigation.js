import React, {Component, Fragment} from 'react';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';

export default class Navigation extends Component {
	constructor() {
		super();
		this.state = {isLoggedIn: false};
		this.renderNavLogin = this.renderNavLogin.bind(this);
	}

	componentDidMount() {
		if (cookie.load("isLoggedIn")) {
			this.setState({isLoggedIn: true});
		}
	}

	renderNavLogin() {
		var nav_loggedin;
		if (this.state.isLoggedIn) {
			nav_loggedin = <Fragment>
				<li className="nav-item">
					<Link to="/create-advert" className="nav-link">Create Advert</Link>
				</li>
				<li className="nav-item">
					<Link to="/logout" className="nav-link">Logout</Link>
				</li>
			</Fragment>
		} else {
			nav_loggedin = <Fragment>
				<li className="nav-item">
					<Link to="/login" className="nav-link">Login</Link>
				</li>
				<li className="nav-item"> 
					<Link to="/create-account" className="nav-link">Create Account</Link>
				</li>
			</Fragment>
		}

		return nav_loggedin;
	}

	render() {
		return(
			<Fragment>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<Link className="navbar-brand" to="/">Australian Adverts Board</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    					<span className="navbar-toggler-icon"></span>
 					</button>
 					<div className="collapse navbar-collapse" id="navbarNav">
 						<ul className="navbar-nav">
 							<li className="nav-item">
								<Link to="/" className="nav-link">Home</Link>
							</li>
							{this.renderNavLogin()}
 						</ul>
 					</div>
				</nav>

			</Fragment>
		);
	}
}