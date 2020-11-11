import React from 'react';
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