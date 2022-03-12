import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/common/hedaer/index';
import Home from './Components/home/index';
import Tv from './Components/tv/index';
import Search from './Components/search/index';
import Profile from './Components/profile/index';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
	return (
		<HashRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movies/:movieId" element={<Home />} />
				<Route path="/tv" element={<Tv />} />
				<Route path="/tv/:movieId" element={<Tv />} />
				<Route path="/search" element={<Search />} />
				<Route path="/search/:movieId" element={<Search />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/*" element={<Profile />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
