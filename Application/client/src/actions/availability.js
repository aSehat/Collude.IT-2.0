import axios from 'axios';

import {
	GET_AVAILABILITY,
	ADD_AVAILABILITY,
	ADD_AVAILABILITY_ERROR,
} from './types';

// Get current users profile
export const getSelfAvailability = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/availability');

		dispatch({
			type: GET_AVAILABILITY,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// Add Availability
export const addAvailability =
	({ startDate, endDate, repeat }) =>
	async (dispatch) => {
		// Sending data so we need to create a config object with headers and data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify({ startDate, endDate, repeat });

		try {
			// Prepare response that will be returned when a request is made to api address with given body and config objects
			const res = await axios.post('/api/availability', body, config);
			// If everything goes okay with the response, we want to dispatch register_success
			dispatch({
				type: ADD_AVAILABILITY,
				payload: res.data,
			});
		} catch (err) {
			// Variable to store the alerts sent back by the api
			const errors = err.response.data.errors;

			if (errors) {
				console.log(errors);
			}
			// If something goes wrong dispatch register fail
			dispatch({
				type: ADD_AVAILABILITY_ERROR,
				// Don't need to attach payload since the reducer for register_fail doesn't utilize one
			});
		}
	};
