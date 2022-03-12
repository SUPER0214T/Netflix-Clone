import React from 'react';
import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	getMovieDetails,
	getMovieVideoData,
	getMovieVideoURL,
	IDetails,
	IGetMoviesResult,
	IGetMovieVideo,
	IMovies,
	ISearchResults,
} from '../../../api';
import { makeImagePath } from '../../../utils';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { overlayAtom, searchOverlayAtom } from '../../../atoms';
import ModalImage from './ModalImage';
import MovieInfo from './MovieInfo';

const MovieModalWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	overflow-y: scroll;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;

	.no-list {
		line-height: 27px;
		font-size: 18px;
		font-weight: 400;
		margin-bottom: 20px;
	}
`;

const MovieModal = styled.div`
	position: absolute;
	width: 95%;

	z-index: 200;
	top: 30px;
	background-color: black;
	border-radius: 6px;
	overflow: hidden;
	min-height: 100vh;

	@media screen and (min-width: 850px) {
		width: 850px;
	}
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	/* background-color: rgba(0, 0, 0, 0.5); */
	opacity: 0;
	z-index: 110;
`;

function Modal(props: { data: IGetMoviesResult | ISearchResults }) {
	const [videoData, setVideoData] = useState<IGetMovieVideo>();
	const [details, setDetails] = useState<IDetails>();
	const { scrollY } = useViewportScroll();
	const movieMatch = useMatch('/movies/:movieId');
	const searchMatch = useMatch('/search/:movieId');
	const tvMatch = useMatch('/tv/:movieId');
	const [videoOpen, setVideoOpen] = useState<null | string>(null);
	const [clickedMovie, setClickedMovie] = useState<null | IMovies>(null);
	//
	const [overlayOpen, setOverlayOpen] = useRecoilState(overlayAtom);
	const setSliderOverlayOpen = useSetRecoilState(searchOverlayAtom);
	const navigate = useNavigate();
	const onOverlayClick = () => {
		navigate(-1);
		setOverlayOpen(false);
	};
	//

	function onClickOverviewAdd() {
		const ovAdd: HTMLElement | null = document.querySelector(
			'.episode-info-left-overview'
		);
		if (ovAdd !== null) {
			ovAdd.style.webkitLineClamp = 'unset';
		}
	}

	useEffect(() => {
		console.log(overlayOpen);
	}, [overlayOpen]);

	const onClickModalClose = () => {
		setOverlayOpen(false);
		setSliderOverlayOpen(false);
		// navigate(-1);
		console.log('닫기 버튼 클릭');
	};

	const onClickModalImg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setVideoOpen(() => {
			if (videoData?.results[0]?.key) {
				return videoData?.results[0]?.key || '';
			} else {
				return null;
			}
		});
	};

	useEffect(() => {
		const clickedMovie = props.data?.results.find((movie) => {
			if (!movieMatch || !searchMatch || !tvMatch) return null;
			return (
				movie.id + '' === movieMatch.params.movieId ||
				searchMatch.params.movieId ||
				tvMatch.params.movieId
			);
		});
		setClickedMovie(clickedMovie || null);
	}, []);

	useEffect(() => {
		const getVideoDB = getMovieVideoData(
			Number(
				movieMatch?.params.movieId ||
					searchMatch?.params.movieId ||
					tvMatch?.params.movieId
			)
		);
		getVideoDB.then((result) => setVideoData(result));

		const getDetails = getMovieDetails(
			Number(
				movieMatch?.params.movieId ||
					searchMatch?.params.movieId ||
					tvMatch?.params.movieId
			)
		);
		getDetails.then((result) => setDetails(result));
	}, []);

	return (
		<MovieModalWrapper style={{ top: scrollY.get() }}>
			<AnimatePresence>
				<Overlay
					onClick={onOverlayClick}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				/>
			</AnimatePresence>
			<MovieModal>
				<ModalImage
					onClickModalClose={onClickModalClose}
					onClickModalImg={onClickModalImg}
					clickedMovie={clickedMovie}
					details={details}
				/>
				<MovieInfo
					onClickOverviewAdd={onClickOverviewAdd}
					setVideoOpen={setVideoOpen}
					videoOpen={videoOpen}
					clickedMovie={clickedMovie}
					details={details}
					videoData={videoData}
				/>
			</MovieModal>
		</MovieModalWrapper>
	);
}

export default Modal;
