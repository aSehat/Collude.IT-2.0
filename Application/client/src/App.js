import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import LandingPage from './components/landing/LandingPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import setAuthToken from './utils/setAuthToken';

import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
