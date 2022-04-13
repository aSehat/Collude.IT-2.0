import axios from 'axios';

import { GET_MEETINGS } from './types';

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
