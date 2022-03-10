import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './style/Navbar.module.css';
// import logo from '../../img/logoHERE.png';

const Navbar = () => {

  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i></i>{' '}
          {/* TODO: Add css class that hides the text when on a small screen */}
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a href = '/'>
          <i></i>{' '}
          {/* TODO: Add css class that hides the text when on a small screen */}
          <span className={styles.alt}>Sign Out</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  var isAuthenticated = false;
  return (
    <nav className={styles.navbar}>
    	{/* <img src={logo} alt="Logo" className={styles.logo} /> */}
		<Link to="/">COLLUDE.IT</Link>
        <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
    </nav>
  );
};
    
export default Navbar;
