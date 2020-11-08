import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

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

	handleCreateUser = (e) => {
		if (this.state.password === this.state.retype) {
			const newUser = {
				email: this.state.email,
				username: this.state.username,
				password: this.state.password
			};

			axios.post("/create/user", newUser)
				.then(response => {
					const data = response.data;
					if (data.success) {
						return(<Redirect to="/login" />);
					} else {
						this.setState({error: data.message});
					}
				}).catch(error => {
					this.setState({error: error.message});
				});
		}
	}

	render() {
		return(
			<Fragment>
				{this.state.error &&
					<div>
						<p>{this.state.error}</p>
					</div>
				}
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