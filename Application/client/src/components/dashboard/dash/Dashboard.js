import React, { Fragment } from 'react';
import Availability from './Availability';
import Meetings from './Meetings';
import Sidebar from '../sidebar/Sidebar';
import { connect } from 'react-redux';

const Dashboard = ({ auth: { user } }) => {
	return (
		<Fragment>
			{user && (
				<div className='page'>
					{/* <div className='header'>
						<h1>Welcome Back {user.name}! </h1>
					</div> */}
					{/* <Sidebar /> */}
					<div className='dashLeft'>
						<Meetings />
					</div>
					<div className='dashRight'>
						<Availability />
					</div>
				</div>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(Dashboard);
