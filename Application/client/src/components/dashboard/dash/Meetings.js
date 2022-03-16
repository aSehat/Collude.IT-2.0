import React from 'react';
import SingleMeeting from './SingleMeeting';

const Meetings = () => {
	return (
		<div className='meetings'>
			<div className='titleMeetings'>
				<h2>Meetings</h2>
				<h3>Your daily Meeting Summary</h3>
				<SingleMeeting />
				<SingleMeeting />
				<SingleMeeting />
				<SingleMeeting />
			</div>
		</div>
	);
};

export default Meetings;
