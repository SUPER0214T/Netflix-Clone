import {
	AnimatePresence,
	motion,
	useViewportScroll,
	Variants,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
	getMovies,
	getMovieVideoData,
	getMovieVideoURL,
	IGetMoviesResult,
	IGetMovieVideo,
} from '../api';
import { makeImagePath } from '../utils';
import { throttle } from 'lodash';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import SliderComponent from '../Components/SliderComponent';
import { useRecoilState } from 'recoil';
import { overlayAtom } from '../atoms';

const Wrapper = styled.div`
	position: relative;
	overflow: hidden;
	height: 200vh;
	background-color: black;
`;

const Loader = styled.div`
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
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
function Home() {
	const [overlayOpen, setOverlayOpen] = useRecoilState(overlayAtom);
	const navigate = useNavigate();

	const movieMatch = useMatch('/movies/:movieId');

	const { data, isLoading } = useQuery<IGetMoviesResult>(
		['movies', 'nowPlaying'],
		getMovies
	);

	const onOverlayClick = () => {
		navigate(`/`);
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
			<Wrapper>
				{isLoading ? (
					<Loader>로딩중...</Loader>
				) : (
					<Banner
						bgimagepath={makeImagePath(data?.results[0].backdrop_path || '')}
					>
						<Info>
							<div>
								<Title>{data?.results[0].title}</Title>
								<OverView>{data?.results[0].overview}</OverView>
							</div>
						</Info>
					</Banner>
				)}

				<SliderComponent data={data} />

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
							data ? (
								<Modal data={data} />
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

export default Home;
