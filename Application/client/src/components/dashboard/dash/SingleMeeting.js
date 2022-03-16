import React from 'react';

const SingleMeeting = () => {
	return (
		<div className='singleMeeting'>
			<h3>Project Design Meeting</h3>
			<p>Meeting Members</p>
			<p>March 16 - 4:00 PM - 7:00 PM</p>
			<div className='meetingFooter'>
				<p className='fas fa-cog'></p>
				<p> Owner </p>
				<button className='startBttn'>Start</button>
			</div>
		</div>
	);
};

export default SingleMeeting;
