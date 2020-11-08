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
		const data_login = {
			username: this.state.username,
			password: this.state.password
		};

		axios.post("/user/login", data_login)
			.then(response => {
				const data = response.data;
				cookie.save("isLoggedIn", true);
				cookie.save("username", this.state.username);
				cookie.save("user_id", data.user_id);
				if (data.success) {
					return(<Redirect to={"/profile/" + user_id}/>);
				} else {
					this.setState({error: data.message});
				}
			}).catch(error => {
				const msg = error.message;
				this.setState({error: msg});
			});
	}

	render() {
		return(
			<Fragment>
				<form>
					{this.state.error && 
						<div>
							<h1>{this.state.error}</h1>
						</div>
					}
					<h1>Login</h1>
					<input type="text" placeholder="Username" onChange={this.handleUsernameInput} />
					<input type="password" placeholder="Password" onChange={this.handlePasswordInput} />
					<input type="submit" value="Login" onClick={this.handleLogin} />
				</form>
			</Fragment>
		);
	}
}