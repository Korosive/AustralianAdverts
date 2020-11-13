import React, {Component, Fragment} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';

export class Login extends Component {
	constructor() {
		super();
		this.state = {username: '', password: ''};
		this.handleUsernameInput = this.handleUsernameInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);
	}

	componentDidMount() {
		if (cookie.load("isLoggedIn")) {
			window.history.back();
		}
	}

	handleUsernameInput = (e) => {
		e.preventDefault();
		this.setState({username: e.target.value});
	}

	handlePasswordInput = (e) => {
		e.preventDefault();
		this.setState({password: e.target.value});
	}

	handleLogin = (e) => {
		e.preventDefault();
		axios.post("/user/login", {
			username: this.state.username,
			password: this.state.password
		}).then(response => {
			const data = response.data;
			if (data.success) {
				cookie.save("isLoggedIn", true);
				cookie.save("username", this.state.username);
				cookie.save("user_id", data.user_id);
				return(<Redirect to="/"/>);
			} else {
				this.setState({error: data.message});
			}
		}).catch(error => {
			const msg = error.message;
			this.setState({error: msg});
		});
	}

	renderError() {
		if (this.state.error) {
			return(<Fragment>
				<div className="alert alert-danger alert-dismissible fade show" role="alert">
  					<p>You should check in on some of those fields below.</p>
  					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    				<span aria-hidden="true">&times;</span>
  					</button>
				</div>
			</Fragment>);
		}
	}

	render() {
		return(
			<Fragment>
				{this.renderError()}
				<h1>Login</h1>
				<hr />
				<form>
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
						<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password:</label>
						<div className="col-sm-10">
							<input type="password" 
								className="form-control" 
								id="inputPassword"
								value={this.state.password}
								onChange={this.handlePasswordChange}>
						</div>
					</div>
					<input type="submit" value="Login" onClick={this.handleLogin} />
				</form>
			</Fragment>
		);
	}
}