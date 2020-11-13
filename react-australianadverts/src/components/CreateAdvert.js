import React, {Component, Fragment} from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class CreateAdvert extends Component {
	constructor() {
		super();
		this.state = {title: '', 
			description: '', 
			primary_contact_method: '', 
			primary_contact_info: ''
		};
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleStartChange = this.handleStartChange.bind(this);
		this.handleEndChange = this.handleEndChange.bind(this);
		this.handlePaymentChange = this.handlePaymentChange.bind(this);
	}

	componentDidMount() {
		if (!cookie.load("isLoggedIn")) {
			return(<Redirect to="/login" />);
		}
	}

	handleTitleChange = (e) => {
		e.preventDefault();
		this.setState({title: e.target.value});
	}

	handleDescriptionChange = (e) => {
		e.preventDefault();
		this.setState({description: e.target.value});
	}

	handleContactMethod = (e) => {
		e.preventDefault();
		this.setState({primary_contact_method: e.target.value});
	}

	handleContactInfo = (e) => {
		e.preventDefault();
		this.setState({primary_contact_info: e.target.value});
	}


	handleCreate = (e) => {
		e.preventDefault();
		axios.post("/adverts/create-advert", {
			user_id: cookie.load("user_id"),
			title: this.state.title,
			description: this.state.description,
			primary_contact_method: this.state.primary_contact_method,
			primary_contact_info: this.state.primary_contact_info
		}).then(response => {
			const data = response.data;
			if (data.success) {
				return(<Redirect to={{
					pathname: "/",
					state: {
						status: true,
						message: data.message
					}
				}}/>);
			} else {
				this.setState({
					fail: true,
					fail_message: data.message
				});
			}
		})
	}

	handleOnCheck = (e) => {
		e.preventDefault();
		this.setState({primary_contact_method: e.target.value});
		var inpWebsite = document.getElementById("contactSite");
		var inpEmail = document.getElementById("contactEmail");
		var inpPhone = document.getElementById("contactPhone");
		switch(e.target.value) {
			case "WEBSITE":
				if (inpWebsite.hasAttribute("readonly")) {
					inpWebsite.removeAttribute("readonly");
				}
				
				if (!inpEmail.hasAttribute("readonly")) {
					inpEmail.setAttribute("readonly");
				}

				if (!inpPhone.hasAttribute("readonly")) {
					inpPhone.setAttribute("readonly");
				}
				break;
			case "EMAIL":
				if (inpEmail.hasAttribute("readonly")) {
					inpEmail.removeAttribute("readonly");
				}

				if (!inpWebsite.hasAttribute("readonly")) {
					inpWebsite.setAttribute("readonly");
				}

				if (!inpPhone.hasAttribute("readonly")) {
					inpPhone.setAttribute("readonly");
				}
				
				break;
			case "PHONE":
				if (inpPhone.hasAttribute("readonly")) {
					inpPhone.removeAttribute("readonly");
				}

				if (!inpWebsite.hasAttribute("readonly")) {
					inpWebsite.setAttribute("readonly");
				}

				if (!inpEmail.hasAttribute("readonly")) {
					inpEmail.setAttribute("readonly");
				}
		}
	}

	renderFail() {
		var message;
		if (this.state.fail) {
			message = <Fragment>
				<div className="alert alert-warning alert-dismissible fade show" role="alert">
  					<p>{this.state.fail_message}</p>
  					<button type="button" className="close" data-dismiss="alert" aria-label="Close">
    					<span aria-hidden="true">&times;</span>
  					</button>
				</div>
			</Fragment>
		}
		return message;
	}

	renderContact() {
		var contactInput;
		const contact_method = this.state.primary_contact_method;
		if (contact_method === "WEBSITE" || contact_method === "PHONE") {
			contactInput = <Fragment>
				<div className="form-group row">
					<label htmlFor="inpContactInfo" className="col-sm-2 col-form-label">Primary Contact Information:</label>
					<div className="col-sm-10">
						<input type="text" 
							className="form-control" 
							id="inpContactInfo"
							value={this.state.primary_contact_info}
							onChange={this.handleContactInfo}>
						</input>
					</div>
				</div>
			</Fragment>
		} else if (contact_method === "EMAIL") {
			contactInput = <Fragment>
				<div className="form-group row">
					<label htmlFor="inpContactInfo" className="col-sm-2 col-form-label">Primary Contact Information:</label>
					<div className="col-sm-10">
						<input type="email" 
							className="form-control" 
							id="inpContactInfo"
							value={this.state.primary_contact_info}
							onChange={this.handleContactInfo}>
						</input>
					</div>
				</div>
			</Fragment>
		}
		return contactInput;
	}

	render() {
		return(
			<Fragment>
			 	{this.renderFail()}
				<h1>Create Advert</h1>
				<hr/>
				<form>
					<div className="form-group row">
						<label htmlFor="inpTitle" className="col-sm-2 col-form-label">Email:</label>
						<div className="col-sm-10">
							<input type="text" 
								className="form-control" 
								id="inpTitle"
								value={this.state.title}
								onChange={this.handleTitleChange} />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inpDescription" className="col-sm-2 col-form-label">Description:</label>
						<div className="col-sm-10">
							<textarea className="form-control" 
								id="inpDescription"
								value={this.state.description}
								onChange={this.handleDescriptionChange}>
							</textarea>
						</div>
					</div>
					<fieldset className="form-group">
						<div className="row">
							<legend className="col-form-label col-sm-2 pt-0">Primary Contact Method:</legend>
							<div className="col-sm-10">
								<div className="form-check">
									<input className="form-check-input" 
										type="radio" 
										name="gridRadios" 
										id="radioWebsite"
										onChange={this.handleOnCheck}
										value="WEBSITE"
										checked/>
									<label className="form-check-label" htmlFor="radioWebsite">Website</label>
									<input type="url"
										className="form-check-input"
										id="contactSite"
										readonly
										value={this.state.contact_site}
										onChange={this.handleContactSite}/>
								</div>
								<div className="form-check">
									<input className="form-check-input" 
										type="radio" 
										name="gridRadios" 
										id="radioEmail"  
										onChange={this.handleOnCheck}
										value="EMAIL" />
									<label className="form-check-label" htmlFor="radioWebsite">Email:</label>
									<input type="email"
										className="form-check-input"
										id="contactEmail"
										readonly
										value={this.state.contact_email}
										onChange={this.handleContactEmail} />
								</div>
								<div className="form-check">
									<input className="form-check-input" 
										type="radio" 
										name="gridRadios" 
										id="radioPhone"  
										onChange={this.handleOnCheck}
										value="PHONE" />
									<label className="form-check-label" htmlFor="radioWebsite">Phone</label>
									<input type="text"
										className="form-check-input"
										id="contactPhone"
										readonly
										value={this.state.contact_phone}
										onChange={this.handleContactPhone} />
								</div>
							</div>
						</div>
					</fieldset>
					
					<button type="submit" className="btn btn-primary" onClick={this.handleCreate}>
						Create Advert
					</button>
				</form>
			</Fragment>
		);
	}
}