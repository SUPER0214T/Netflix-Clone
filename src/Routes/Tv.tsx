import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { useMatch, useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import SliderComponent from '../Components/SliderComponent';
import { useRecoilState } from 'recoil';
import { overlayAtom, searchInputValueAtom, searchOpenAtom } from '../atoms';
import TvSlider from '../Components/TvSlider';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
	position: relative;
	overflow: hidden;
	background-color: black;

	.slider-position {
		position: relative;
		top: -160px;
	}
`;

const Loader = styled.div`
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 5vw;
`;

const Banner = styled.div<{ bgimagepath: string }>`
	height: 100vh;
	background-color: red;
	position: relative;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
		url(${(props) => props.bgimagepath});
	background-size: cover;
	background-position: center center;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 35%;
	position: absolute;
	left: 4%;
	bottom: 25%;
`;

const Title = styled.h2`
	font-size: 4vw;
	font-weight: 700;
	line-height: normal;
	text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);
	margin-bottom: 1.2vw;
`;

const OverView = styled.p`
	font-size: 1.4vw;
	font-weight: 400;
	line-height: normal;
	text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);
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

/* Home Component */
function Tv() {
	const [overlayOpen, setOverlayOpen] = useRecoilState(overlayAtom);
	const navigate = useNavigate();
	const movieMatch = useMatch('/tv/:movieId');
	const { data: dataPage01, isLoading: isData01Loading } =
		useQuery<IGetMoviesResult>(['movies', 'page01'], () => getMovies(1));

	const { data: dataPage02, isLoading: isData02Loading } =
		useQuery<IGetMoviesResult>(['movies', 'page02'], () => getMovies(2));

	const { data: dataPage03, isLoading: isData03Loading } =
		useQuery<IGetMoviesResult>(['movies', 'page03'], () => getMovies(3));

	const onOverlayClick = () => {
		navigate(`/tv`);
		setOverlayOpen(false);
	};

	useEffect(() => {
		if (overlayOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [overlayOpen]);

	return (
		<>
			<Helmet>
				<title>시리즈 - 넷플릭스</title>
			</Helmet>
			<Wrapper>
				{isData02Loading ? (
					<Loader>로딩중...</Loader>
				) : (
					<>
						<Banner
							bgimagepath={makeImagePath(
								dataPage02?.results[0].backdrop_path || ''
							)}
						>
							<Info>
								<div>
									<Title>{dataPage02?.results[0].title}</Title>
									<OverView>{dataPage02?.results[0].overview}</OverView>
								</div>
							</Info>
						</Banner>

						<div className="slider-position">
							<TvSlider data={dataPage02} titleName="지금 뜨는 콘텐츠" />
							<TvSlider data={dataPage01} titleName="다시보기 추천 콘텐츠" />
							<TvSlider data={dataPage03} titleName="몰아보기 추천 시리즈" />
						</div>
					</>
				)}

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
							dataPage01 ? (
								<Modal data={dataPage01} />
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

export default Tv;
