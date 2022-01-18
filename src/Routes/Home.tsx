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

const Slider = styled.div`
	position: relative;
`;

const Row = styled(motion.div)<{ gridcolumns: number }>`
	display: grid;
	grid-template-columns: repeat(${(props) => props.gridcolumns}, 1fr);
	gap: 10px;
	margin-bottom: 5px;
	position: absolute;
	width: 100%;
	height: 20vh;
	padding: 5px;
`;

const Box = styled(motion.div)<{ bgimagepath: string }>`
	background-color: #fff;
	border-radius: 0.2vw;
	background-image: url(${(props) => props.bgimagepath});
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	cursor: pointer;

	&:first-child {
		transform-origin: left;
	}

	&:last-child {
		transform-origin: right;
	}
`;

const BoxInfo = styled(motion.div)`
	position: absolute;
	padding: 20px;
	background-color: ${(props) => props.theme.black.darker};
	bottom: -50%;
	width: 100%;
	height: 50%;
	opacity: 0;
`;

const MovieModalWrapper = styled(motion.div)`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	overflow-y: scroll;
`;

const MovieModal = styled(motion.div)`
	position: absolute;
	width: 850px;
	height: 200vh;
	z-index: 100;
	background-color: black;
	overflow-y: scroll;
	border-radius: 6px;

	@media screen and (max-width: 850px) {
		width: 95%;
	}
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
	z-index: 3;
`;

const ModalCover = styled.div``;

const ModalImg = styled.div`
	width: 100%;
	img {
		width: 100%;
	}
`;

const ModalTitle = styled.h2``;

// Variants
const sliderVariants: Variants = {
	hidden: { x: window.outerWidth + 5 },
	visible: { x: 0 },
	exit: { x: -window.outerWidth - 5 },
};

const boxVariants: Variants = {
	normal: { scale: 1 },
	hover: {
		scale: 1.3,
		y: -50,
		transition: {
			delay: 0.35,
			duration: 0.2,
			type: 'tween',
		},
	},
};

const boxInfoVariants: Variants = {
	hover: {
		transition: {
			delay: 0.35,
			type: 'tween',
			duration: 0.2,
		},
		opacity: 1,
	},
};

/* Home Component */
function Home() {
	const [sliderIndex, setSliderIndex] = useState(0);
	const [sliderLimit, setSliderLimit] = useState(false);
	const [overlayOpen, setOverlayOpen] = useState(false);
	const [offset, setOffset] = useState(6);
	const navigate = useNavigate();
	const { scrollY } = useViewportScroll();

	const movieMatch = useMatch('/movies/:movieId');

	const { data, isLoading } = useQuery<IGetMoviesResult>(
		['movies', 'nowPlaying'],
		getMovies
	);

	// const { data: videoData, isLoading: videoDataLoading } =
	// 	useQuery<IGetMovieVideo>(['movies2', 'videoData'], () =>
	// 		getMovieVideoData(Number(movieMatch?.params.movieId))
	// 	);

	// overlay가 open -> 새로운 모달이 열렸다. -> overlay가 open일 때 데이터를 받아오자

	const increaseSliderIndex = () => {
		if (sliderLimit) return;
		setSliderLimit(true);
		if (data) {
			const totalMovies = data?.results.length;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const toggleSliderLimit = () => {
		setSliderLimit(false);
	};

	const handleResize = throttle(() => {
		if (window.outerWidth >= 1400) {
			setOffset(6);
		} else if (window.outerWidth >= 1100) {
			setOffset(5);
		} else if (window.outerWidth >= 800) {
			setOffset(4);
		} else if (window.outerWidth >= 500) {
			setOffset(3);
		} else {
			setOffset(2);
		}
	}, 200);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const onBoxClick = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	};

	const onOverlayClick = () => {
		navigate(`/`);
		setOverlayOpen(false);
	};

	const clickedMovie = data?.results.find((movie) => {
		if (!movieMatch) return 1;
		return movie.id + '' === movieMatch.params.movieId;
	});

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
						onClick={increaseSliderIndex}
						bgimagepath={makeImagePath(data?.results[0].backdrop_path || '')}
					>
						<Info>
							<div>
								<Title>{data?.results[0].original_title}</Title>
								<OverView>{data?.results[0].overview}</OverView>
							</div>
						</Info>
					</Banner>
				)}

				<Slider>
					<AnimatePresence initial={false} onExitComplete={toggleSliderLimit}>
						<Row
							variants={sliderVariants}
							initial={{ x: window.outerWidth }}
							animate={{ x: 0 }}
							exit={{ x: -window.outerWidth }}
							transition={{ type: 'tween', duration: 0.75 }}
							key={sliderIndex}
							gridcolumns={offset}
						>
							{data?.results
								.slice(sliderIndex * offset, sliderIndex * offset + offset)
								.map((movie) => (
									<Box
										key={movie.id + ''}
										bgimagepath={makeImagePath(
											movie.backdrop_path || movie.poster_path
										)}
										variants={boxVariants}
										initial="normal"
										whileHover="hover"
										transition={{ type: 'tween' }}
										onClick={() => {
											onBoxClick(movie.id);
											setOverlayOpen(true);
										}}
										// layoutId={movie.id + ''}
									>
										{/* BoxInfo에도 whileHover가 들어간다. */}
										<BoxInfo variants={boxInfoVariants}>{movie.title}</BoxInfo>
									</Box>
								))}
						</Row>
					</AnimatePresence>
				</Slider>

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
