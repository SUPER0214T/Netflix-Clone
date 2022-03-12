import { motion } from 'framer-motion';
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useLocation, useMatch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getSearchResults, ISearchResults } from '../api';
import { overlayAtom } from '../atoms';
import Modal from '../Components/Modal/index';
import SearchSlider from '../Components/SearchSlider';
import { useWindowResize } from '../Hooks/useWindowResize';

const Wrapper = styled.div`
	height: 100vh;

	.search-slider-wrapper {
		padding-top: 8%;
	}

	@media screen and (max-width: 885px) {
		padding-top: calc(8%);
	}
`;

function Search() {
	const location = useLocation();
	const [searchInputValue, setSearchInputValue] = useState('');
	const [searchData, setSearchData] = useState<ISearchResults>();
	const [isSearchDataReady, setIsSearchDataReady] = useState<boolean>(false);
	const [overlayOpen, setOverlayOpen] = useRecoilState(overlayAtom);
	const movieMatch = useMatch('/search/:movieId');
	const [offset, setOffset] = useState(6);
	const [sliderIndex, setSliderIndex] = useState(3);

	useEffect(() => {
		if (overlayOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [overlayOpen]);

	useWindowResize(searchData, offset, setOffset, setSliderIndex);

	useEffect(() => {
		const search = new URLSearchParams(location.search);
		const copyInputValue = search.get('keyword');
		setSearchInputValue(copyInputValue || '');

		if (copyInputValue === null) return;
		if (copyInputValue?.length >= 2) {
			const getDB = getSearchResults(search.get('keyword') || '');

			getDB.then((result) => {
				if (result.results.length !== 0) {
					setSearchData(result);
					setIsSearchDataReady(true);
				} else {
					setIsSearchDataReady(false);
				}
			});
		}
	}, [location]);

	function dataFor() {
		let elementArr = [];
		for (let i = 0; i <= sliderIndex; i++) {
			elementArr.push(
				<SearchSlider
					data={searchData}
					offset={offset}
					sliderIndex={i}
					key={i}
				/>
			);
		}

		return elementArr.map((slider) => slider);
	}

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>넷플릭스</title>
				</Helmet>
			</HelmetProvider>
			<Wrapper>
				<div className="search-slider-wrapper">
					{isSearchDataReady ? dataFor() : <h1>검색 결과가 없습니다.</h1>}
				</div>

				{movieMatch ? (
					<>
						{overlayOpen ? (
							searchData ? (
								<Modal data={searchData} />
							) : (
								<h1>Loading...</h1>
							)
						) : null}
					</>
				) : null}
			</Wrapper>
		</>
	);
}

export default Search;
