import React from 'react';
import axios from 'axios';

export const DeleteUser = (props) => {
	const user_id = props.user_id;
	axios.delete("/user/delete/" + user_id)
		.then(response => {
			const data = response.data;
			return data;
		}).catch(error => {
			return error;
		});
}