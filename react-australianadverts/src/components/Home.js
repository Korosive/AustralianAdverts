import React, {Component, Fragment} from 'react';
import axios from 'axios';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {adverts: []};
		this.renderAdverts = this.renderAdverts.bind(this);
		this.renderError = this.renderError.bind(this);
		this.renderEmpty = this.renderEmpty.bind(this);
	}

	componentDidMount() {
		document.title = "Australian Adverts | Home";
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

	render() {
		return(
			<Fragment>
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