import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

export class Home extends Component {
	constructor() {
		super();
		this.state = {adverts: []};
		this.renderAdverts = this.renderAdverts.bind(this);
	}

	componentDidMount() {
		axios.get("/adverts/get/live")
			.then(response => {
				const data = response.data;
				if (data.isArray() && data.length) {
					this.setState({adverts:data});
				} else {
					this.setState({error: "empty"});
				}
			}).catch(error => {
				this.setState({error: "error"});
			});
	}

	renderAdverts() {
		var listAdverts;
		if (this.state.adverts) {
			listAdverts = <Fragment>
				<div className="accordion" id="advertAccordion">
					{this.state.adverts.map((advert, i) =>
						<Fragment>
							<div class="card">
								<div className="card-header" id={"title" + i}>
									<h2 className="mb-0">
										<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={"#collapse" + i} aria-expanded="true" aria-controls={"collpase" + i}>
											{advert.title}
										</button>
									</h2>
								</div>
							</div>
							<div id={"collapse" + i} className="collapse show" aria-labelledby={"title" + i} data-parent="#advertAccordion">
								<div class="card-body">
									<p>{advert.description}</p>
									<p>Primary Contact: {advert.primary_contact_info} ({advert.primary_contact_method})</p>
								</div>
							</div>
						</Fragment>
					}
				</div>
			</Fragment>);
		} else {
			if (this.state.error) {
				if (this.state.error === "empty") {
					errorMsg = <Fragment>
						<div className="alert alert-danger" role="alert">
							<p>No adverts available</p>
						</div>
					</Fragment>;
				}

				if (this.state.error === "error") {
					errorMsg = <Fragment>
						<div className="alert alert-danger" role="alert">
							<p>Error in retrieving adverts! Please try again!</p>
						</div>
					</Fragment>;
				}
			}
		}

		return listAdverts;
	}

	render() {
		return(
			<Fragment>
				{this.renderError()}
				<h1>Australian Adverts Board</h1>
				<hr />
				{this.renderAdverts()}
			</Fragment>
		);
	}
}