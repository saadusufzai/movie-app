import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Details from './pages/Details';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/details/:id' element={<Details />} />
				<Route path='/stats' element={<Stats />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
