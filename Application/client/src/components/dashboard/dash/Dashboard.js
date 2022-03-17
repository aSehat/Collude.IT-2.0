import React, { Fragment } from 'react';
import Availability from './Availability';
import Meetings from './Meetings';
import Sidebar from '../sidebar/Sidebar';

const Dashboard = () => {
	return (
		<div className='page'>
			<Sidebar />
			<div className='header'>
				<h1>Welcome Back!</h1>
			</div>
			<Meetings />
			<Availability />
		</div>
	);
};

export default Dashboard;
