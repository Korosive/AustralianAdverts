import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

export class CreateAccount extends Component {
	constructor() {
		super();
		this.state = {email: '', username: '', password: '', retype: ''};
	}

	componentDidMount() {
		if (cookie.loaded("isLoggedIn")) {
			window.history.back();
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

	handleCreateAccount = (e) => {
		e.preventDefault();
		const username = this.state.username;
		const email = this.state.email;
		const password = this.state.password;
		const retype = this.state.retype;
		if (username !== "" && email !== "" && password !== "" && retype !== "") {
			if (password === retype) {
				axios.post("/users/create-account", {
					email: email,
					username: username,
					password: password
				}).then(response => {
					const data = response.data;
					if (data.success) {
						return(<Redirect to="/" />);
					} else {
						this.setState({errorMsg: data.message});
					}
				}).catch(error => {
					this.setState({errorMsg: error.message});
				});
			} else {
				this.setState({errorMsg: "Passwords do not match."});
			}
		} else {
			this.setState({errorMsg: "One or more fields have been left empty."});
		}
	}

	render() {
		return(
			<Fragment>
				<h1>Create Account</h1>
				<hr />
				<form>
					<div className="form-group row">
						<label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email:</label>
						<div className="col-sm-10">
							<input type="email" 
								className="form-control" 
								id="inputEmail"
								value={this.state.email}
								onChange={this.handleEmailChange}>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputUsername" className="col-sm-2 col-form-label">Username:</label>
						<div className="col-sm-10">
							<input type="text" 
								className="form-control" 
								id="inputUsername"
								value={this.state.username}
								onChange={this.handleUsernameChange}>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Username:</label>
						<div className="col-sm-10">
							<input type="password" 
								className="form-control" 
								id="inputEmail"
								value={this.state.password}
								onChange={this.handlePasswordChange}>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputRetype" className="col-sm-2 col-form-label">Retype Password:</label>
						<div className="col-sm-10">
							<input type="password" 
								className="form-control" 
								id="inputRetype"
								value={this.state.retype}
								onChange={this.handleRetypeChange}>
						</div>
					</div>
					<div className="form-group row">
						<div className="col-sm-10">
							<button type="submit" className="btn btn-primary" onClick={this.handleCreateAccount}>
								Create Account
							</button>
						</div>
					</div>
				</form>
			</Fragment>
		);
	}
}