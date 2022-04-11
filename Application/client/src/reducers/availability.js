import {
	GET_AVAILABILITY,
	AVAILABILITY_ERROR,
	CLEAR_AVAILABILITY,
	ADD_AVAILABILITY,
	ADD_AVAILABILITY_ERROR,
} from '../actions/types';

const initialState = {
	availabilities: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_AVAILABILITY:
			return {
				...state,
				availabilities: payload,
				loading: false,
			};
		case ADD_AVAILABILITY:
			return {
				...state,
				availabilities: payload,
				// availabilities: [payload, ...state.availabilities],
				loading: false,
			};
		case AVAILABILITY_ERROR:
		case ADD_AVAILABILITY_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case CLEAR_AVAILABILITY:
			return {
				...state,
				availabilities: [],
				loading: false,
			};
		default:
			return state;
	}
}
