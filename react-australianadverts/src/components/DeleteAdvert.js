import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

export const DeleteAdvert = (props) => {
	const advert_id = props.advert_id;
	axios.delete("/adverts/delete/" + advert_id).
		.then(response => {
			const data = response.data;
			return(data);
		}).catch(error => {
			return(error);
		});
}