import React, {Component, Fragment} from 'react';
import axios from 'axios';

export class Home extends Component {
	constructor() {
		super();
		this.state = {adverts: []};
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

	render() {
		var errorMsg;

		if (this.state.error) {
			if (this.state.error === "empty") {
				errorMsg = <Fragment>
					<div>
						<p>No adverts to show at the moment.</p>
					</div>
				</Fragment>
			} else if (this.state.error === "error") {
				errorMsg = <Fragment>
					<div>
						<p>Error in retrieving adverts!</p>
					</div>
				</Fragment>
			}
		} else {
			errorMsg = this.state.adverts.map((advert, i) => {
				<Fragment>
					<li>
						<div>
							<h5>{advert.title}</h5>
							<small>{"Start date: " + advert.start_date + " | End date: " + advert.end_date + " | Payment: $" + advert.payment}</small>
							<p>{advert.description}</p>
						</div>
					</li>
				</Fragment>
			});
		}


		return(
			<Fragment>
				<h1>Australian Adverts Board</h1>
				<hr />
				<ul>
					{errorMsg}
				</ul>
			</Fragment>
		);
	}
}