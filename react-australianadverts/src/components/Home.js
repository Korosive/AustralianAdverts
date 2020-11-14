import React, {Component, Fragment} from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {adverts: []};
		this.renderAdverts = this.renderAdverts.bind(this);
		this.renderError = this.renderError.bind(this);
		this.renderEmpty = this.renderEmpty.bind(this);
		this.renderLogout = this.renderLogout.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
	}

	componentDidMount() {
		document.title = "Australian Adverts";
		axios.get("/adverts/get/adverts")
		.then(response => {
			const data = response.data;
			if (Array.isArray(data) && data.length) {
				this.setState({adverts:data});
			} else {
				this.setState({error: "empty"});
			}
		}).catch(error => {
			this.setState({error: "error"});
			console.log(error.message);
		});

		if (cookie.load("just_logged_in")) {
			this.setState({just_logged_in: true});
			cookie.remove("just_logged_in");
		}

		if (cookie.load("logout")) {
			this.setState({logged_out: true});
			cookie.remove("logout");
		}

		if (cookie.load("invalid_logout")) {
			this.setState({invalid_logout: true});
			cookie.remove("invalid_logout");
		}
	}

	renderAdverts() {
		var listAdverts;
		if (this.state.adverts) {
			listAdverts = <Fragment>
				<div className="accordion" id="advertAccordion">
					{this.state.adverts.map((advert, i) => {
						<Fragment>
							<div className="card">
								<div className="card-header" id={"title" + i}>
									<h2 className="mb-0">
										<button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={"#collapse" + i} aria-expanded="true" aria-controls={"collpase" + i}>
											{advert.title}
										</button>
									</h2>
								</div>
							</div>
							<div id={"collapse" + i} className="collapse show" aria-labelledby={"title" + i} data-parent="#advertAccordion">
								<div className="card-body">
									<p>{advert.description}</p>
									<p>Primary Contact: {advert.primary_contact_info} ({advert.primary_contact_method})</p>
								</div>
							</div>
						</Fragment>
					})}
				</div>
			</Fragment>
		}

		return listAdverts;
	}

	renderError() {
		var message;
		if (this.state.error) {
			if (this.state.error === "error") {
				message = <div className="alert alert-danger alert-dismissible fade show m-2" role="alert">
					Error in retrieving adverts!
					<button type="button" className="close" data-dismiss="alert" aria-label="Close">
    					<span aria-hidden="true">&times;</span>
  					</button>
				</div>
			}
		}
		return message;
	}

	renderEmpty() {
		var message;
		if (this.state.error) {
			if (this.state.error === "empty") {
				message = <p>No adverts Sadge</p>
			}
		}

		return message;
	}

	renderLogout() {
		var message;
		if (this.state.logged_out) {
			message = <div className="alert alert-success alert-dismissible fade show m-2" role="alert">
				Successfully logged out!
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
    				<span aria-hidden="true">&times;</span>
  				</button>
			</div>
			this.setState({logged_out: false});
		} else if (this.state.invalid_logout) {
			message = <div className="alert alert-danger alert-dismissible fade show m-2" role="alert">
				Unable to logout!
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
    				<span aria-hidden="true">&times;</span>
  				</button>
			</div>
			this.setState({logged_out: false});
		}

		return message;
	}

	renderLogin() {
		if (this.state.just_logged_in) {
			this.setState({just_logged_in: false});
			return(<div className="alert alert-success alert-dismissible fade show m-2" role="alert">
				Successfully logged in!
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
    				<span aria-hidden="true">&times;</span>
  				</button>
			</div>);
		}
	}

	render() {
		return(
			<Fragment>
				{this.renderLogout()}
				{this.renderLogin()}
				{this.renderError()}
				<div className="m-5">
					<h1 className="text-center">Australian Adverts Board</h1>
					<hr />
					{this.renderEmpty()}
					{this.renderAdverts()}
				</div>
			</Fragment>
		);
	}
}