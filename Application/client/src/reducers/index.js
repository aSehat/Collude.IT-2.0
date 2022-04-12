import { combineReducers } from 'redux';
import auth from './auth';
import availability from './availability';

export default combineReducers({
	//Add all reducers we make in here
	auth,
	availability,
});
