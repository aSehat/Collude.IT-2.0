import React from 'react';
import SingleMeeting from './SingleMeeting';

const Meetings = () => {
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

export default Meetings;
