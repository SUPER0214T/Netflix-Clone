import { AnimatePresence, motion } from 'framer-motion';
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getSearchResults, ISearchResults } from '../api';
import { searchOverlayAtom } from '../atoms';
import Modal from '../Components/Modal';
import SearchSlider from '../Components/SearchSlider';

const Wrapper = styled.div`
	height: 100vh;

	.search-slider-wrapper {
		padding-top: 8%;
	}

	@media screen and (max-width: 885px) {
		padding-top: calc(8%);
	}
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
	z-index: 30;
`;

function Search() {
	const location = useLocation();
	const [searchInputValue, setSearchInputValue] = useState('');
	const navigate = useNavigate();
	const [searchData, setSearchData] = useState<ISearchResults>();
	const [isSearchDataReady, setIsSearchDataReady] = useState<boolean>(false);
	const [overlayOpen, setOverlayOpen] = useRecoilState(searchOverlayAtom);
	const movieMatch = useMatch('/search/:movieId');
	const [offset, setOffset] = useState(6);
	const [sliderIndex, setSliderIndex] = useState(3);

	const onOverlayClick = () => {
		navigate(-1);
		setOverlayOpen(false);
	};

	useEffect(() => {
		if (overlayOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [overlayOpen]);

	const handleResize = throttle(() => {
		const totalMovies = searchData?.results.length || 20;
		const maxIndex = Math.floor(totalMovies / offset) - 1;
		if (window.outerWidth >= 1400) {
			setOffset(6);
			setSliderIndex(maxIndex);
		} else if (window.outerWidth >= 1100) {
			setOffset(5);
			setSliderIndex(maxIndex);
		} else if (window.outerWidth >= 800) {
			setOffset(4);
			setSliderIndex(maxIndex);
		} else if (window.outerWidth >= 500) {
			setOffset(3);
			setSliderIndex(maxIndex);
		} else {
			setOffset(2);
			setSliderIndex(maxIndex);
		}
	}, 200);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const search = new URLSearchParams(location.search);
		const copyInputValue = search.get('keyword');
		setSearchInputValue(copyInputValue || '');

		if (copyInputValue === null) return;
		if (copyInputValue?.length >= 2) {
			const getDB = getSearchResults(search.get('keyword') || '');
			console.log(search.get('keyword'));
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
		console.log('elementArr: ', elementArr);
		console.log('sliderIndex: ', sliderIndex);
		console.log('offset: ', offset);
		return elementArr.map((slider) => slider);
	}
	console.log('searchData: ', searchData);

	return (
		<>
			<Helmet>
				<title>넷플릭스</title>
			</Helmet>
			<Wrapper>
				<div className="search-slider-wrapper">
					{isSearchDataReady ? dataFor() : <h1>검색 결과가 없습니다.</h1>}
				</div>

				{movieMatch ? (
					<>
						<AnimatePresence>
							<Overlay
								onClick={onOverlayClick}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							/>
						</AnimatePresence>
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
