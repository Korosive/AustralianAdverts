import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';

export class CreateUser extends Component {
	constructor() {
		super();
		this.state = {email: '', username: '', password: '', retype: ''};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleRetypeChange = this.handleRetypeChange.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
	}

	componentDidMount() {
		if (cookie.load("isLoggedIn")) {
			return(<Redirect to="/login" />);
		}
	}

	handleEmailChange = (e) => {
		e.preventDefault();
		this.setState({email: e.target.value});
	}

	handleUsernameChange = (e) => {
		e.preventDefault();
		this.setState({username: e.target.value});
	}

	handlePasswordChange = (e) => {
		e.preventDefault();
		this.setState({password: e.target.value});
	}

	handleRetypeChange = (e) => {
		e.preventDefault();
		this.setState({retype: e.target.value});
	}

	render() {
		return(
			<Fragment>
				<form>
					<h5>Create Account</h5>
					<hr />
					<input type="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleEmailChange} />
					<input type="text"
						placeholder="Username"
						value={this.state.username}
						onChange={this.handleUsernameChange} />
					<input type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handlePasswordChange} />
					<input type="password"
						placeholder="Retype Password"
						value={this.state.retype}
						onChange={this.handleRetypeChange} />
					<input type="submit"
						value="Create Account"
						onClick={this.handleCreateUser} />
				</form>
			</Fragment>
		);
	}
}