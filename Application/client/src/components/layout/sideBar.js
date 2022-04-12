import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './style/sideBar.module.css';

const SideBar = ({ auth: { isAuthenticated } }) => {
	const slideIn = () => {
		var x = document.getElementById('slider');
		if (x.className === styles.slideOut) {
			var y = document.getElementsByClassName('page');
			[...y].forEach((x) => (x.className = 'pageExpand'));
			x.className = styles.slideIn;
		} else {
			x.className = styles.slideOut;
			var z = document.getElementsByClassName('pageExpand');
			[...z].forEach((x) => (x.className = 'page'));
		}
	};

	return (
		<Fragment>
			{isAuthenticated && (
				<div id='slider' className={styles.slideOut}>
					<div
						id='slideOutTab'
						className={styles.slideOutTab}
						onClick={slideIn}
					>
						<div className={styles.slideButton} onClick={slideIn}>
							<p onClick={slideIn}> Profile </p>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

// List all proptypes here for error checking
// This should contain all props used and be reflected by the function parameters that use them above
// SideBar.propTypes = {
// 	getCurrentProfile: PropTypes.func.isRequired,
// 	auth: PropTypes.object.isRequired,
// };

// Use mapStateToProps when we want to pull a value from the state, in this case updating auth and the profile object
const mapStateToProps = (state) => ({
	auth: state.auth,
});

// Need to export connect with the component itself
// export default connect()(SideBar);

// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
// export default SideBar;

export default connect(mapStateToProps, {})(SideBar);
