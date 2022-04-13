import React, { useEffect } from 'react';
import SingleMeeting from './SingleMeeting';
import { connect } from 'react-redux';
import { getMeetings } from '../../../actions/meetings';
import { useDispatch } from 'react-redux';

const Meetings = ({ meetings }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMeetings());
	}, []);

	return (
		<div className='meetings'>
			<div>
				<h2>Meetings</h2>
				<h3>Your daily Meeting Summary</h3>
			</div>
			<SingleMeeting />
			<SingleMeeting />
			<SingleMeeting />
			<SingleMeeting />
		</div>
	);
};

const mapStateToProps = (state) => ({
	meetings: state.meetings,
});

export default Meetings;
