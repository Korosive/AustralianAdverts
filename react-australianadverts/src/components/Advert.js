import React, {Component, Fragment} from 'react';
import axios from 'axios';

export class Advert extends Component {
	constructor() {
		super();
		this.state = {title: '', description: '', start_date: '', end_date: '', payment: ''};
	}

	componentDidMount() {
		const advert_id = this.props.match.params.advert_id;
		if (advert_id) {
			axios.get("/adverts/get/" + advert_id)
				.then(response => {
					const data = response.data;
					this.setState({
						title: data.title,
						description: data.description,
						start_date: data.start_date,
						end_date: data.end_date,
						payment: data.payment,
					});
				}).catch(error => {
					this.setState({error: error.message});
				});
		} else {
			window.history.back();
		}
	}

	render() {
		return(
			<Fragment>
				<div>
					<h5>{this.state.title}</h5>
					<small>{"Start: " + this.state.start_date + " | End: " + this.state.end_date} + " | $" + this.start.payment</small>
					<p>{this.state.description}</p>
					<button type="button">Pay</button>
				</div>
			</Fragment>
		);
	}
}