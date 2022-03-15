import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import LandingPage from './components/landing/LandingPage';
// import DateSelector from './components/dashboard/dash/Availability';
import Availability from './components/dashboard/dash/Availability';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';


const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<div>LoginPage</div>} />
            <Route path="/avail" element={<Availability/>} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
