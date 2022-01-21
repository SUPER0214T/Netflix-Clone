import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
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
				<Route path="/*" element={<h1>존재하지 않는 페이지입니다.</h1>} />
			</Routes>
			<ReactQueryDevtools initialIsOpen={true} />
		</HashRouter>
	);
}

export default App;
