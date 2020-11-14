import React, {Component, Fragment} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';

export default class Login extends Component {
	constructor() {
		super();
		this.state = {username: '', password: ''};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.renderError = this.renderError.bind(this);
		this.renderCreateAccount = this.renderCreateAccount.bind(this);
	}

	componentDidMount() {
		if (cookie.load("isLoggedIn")) {
			window.history.back();
		}
		document.title = "Login";
	}

	handleUsernameChange = (e) => {
		e.preventDefault();
		this.setState({username: e.target.value});
	}

	handlePasswordChange = (e) => {
		e.preventDefault();
		this.setState({password: e.target.value});
	}

	handleLogin = (e) => {
		e.preventDefault();
		axios.post("/users/login", {
			username: this.state.username,
			password: this.state.password
		}).then(response => {
			const data = response.data;
			if (data.success) {
				if (cookie.load("logout")) {
					cookie.remove("logout");
				}
				cookie.save("isLoggedIn", true);
				cookie.save("username", this.state.username);
				cookie.save("user_id", data.user_id);
				cookie.save("just_logged_in", true);
				this.setState({
					success: true,
					message: data.message
				});
				window.location.reload();
			} else {
				this.setState({error: data.message});
			}
		}).catch(error => {
			this.setState({error: error.message});
		});
	}

	renderError = () => {
		if (this.state.error) {
			return(<Fragment>
				<div className="alert alert-danger alert-dismissible fade show m-5" role="alert">
  					{this.state.error}
  					<button type="button" className="close" data-dismiss="alert" aria-label="Close">
    					<span aria-hidden="true">&times;</span>
  					</button>
				</div>
			</Fragment>);
		}
	}

	renderCreateAccount = () => {
		if (cookie.load("success")) {
			var message = <Fragment>
				<div className="alert alert-danger alert-dismissible fade show m-5" role="alert">
  					{cookie.load("success")}
  					<button type="button" className="close" data-dismiss="alert" aria-label="Close">
    					<span aria-hidden="true">&times;</span>
  					</button>
				</div>
			</Fragment>
			cookie.remove("success");
			return(message);
		}
	}

	render() {
		if (this.state.success) {
			const destination = {
				pathname: "/",
				state: {
					success: true,
					message: this.state.message
				}
			};
			return <Redirect to={destination}/>;
		}

		return(
			<Fragment>
				{this.renderCreateAccount()}
				{this.renderError()}
				<form className="m-5">
					<h1 className="text-center">Login</h1>
					<hr />
					<div className="form-group row">
						<label htmlFor="inputUsername" className="col-sm-2 col-form-label">Username:</label>
						<div className="col-sm-10">
							<input type="text" 
								className="form-control" 
								id="inputUsername"
								value={this.state.username}
								onChange={this.handleUsernameChange} />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password:</label>
						<div className="col-sm-10">
							<input type="password" 
								className="form-control" 
								id="inputPassword"
								value={this.state.password}
								onChange={this.handlePasswordChange} />
						</div>
					</div>
					<input type="submit" value="Login" onClick={this.handleLogin} />
				</form>
			</Fragment>
		);
	}
}