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
	min-height: 20vh;

	.slider-button {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		width: 4%;
		height: 100%;
		background-color: rgba(20, 20, 20, 0.4);
		cursor: pointer;

		svg {
			width: 100%;
			height: 30%;
		}

		&:hover {
			background-color: rgba(20, 20, 20, 0.6);
		}
	}

	.slider-left {
		left: 0;
		top: 0;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.slider-right {
		right: 0;
		top: 0;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
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

	.box-info-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
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
	visibility: hidden;
	transition: visibility 0.35s ease-in-out;
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

// Variants
const sliderVariants: Variants = {
	// hidden: { x: window.outerWidth + 5 },
	hidden: (isBack: Boolean) => ({
		x: isBack ? -window.outerWidth - 5 : window.outerWidth + 5,
	}),
	visible: { x: 0 },
	// exit: { x: -window.outerWidth - 5 },
	exit: (isBack: Boolean) => ({
		x: isBack ? window.outerWidth + 5 : -window.outerWidth - 5,
	}),
};

const boxVariants: Variants = {
	normal: { scale: 1 },
	hover: {
		scale: 1.3,
		y: -50,
		zIndex: 3,
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
		visibility: 'visible',
	},
};

/* Home Component */
function Home() {
	const [sliderIndex, setSliderIndex] = useState(0);
	const [back, setBack] = useState(false);
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
			setBack(false);
			const totalMovies = data?.results.length;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const decreaseSliderIndex = () => {
		if (sliderLimit) return;
		setSliderLimit(true);
		if (data) {
			setBack(true);
			const totalMovies = data?.results.length;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setSliderIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
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
					<div
						className="slider-button slider-left"
						onClick={decreaseSliderIndex}
					>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="chevron-left"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 320 512"
							className="chevron-left"
						>
							<path
								fill="currentColor"
								d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
							></path>
						</svg>
					</div>
					<div
						className="slider-button slider-right"
						onClick={increaseSliderIndex}
					>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="chevron-right"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 320 512"
							className="chevron-right"
						>
							<path
								fill="currentColor"
								d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
							></path>
						</svg>
					</div>
					<AnimatePresence
						initial={false}
						onExitComplete={toggleSliderLimit}
						custom={back}
					>
						<Row
							variants={sliderVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							// initial={{ x: back ? -window.outerWidth : window.outerWidth }}
							// animate={{ x: 0 }}
							// exit={{ x: back ? window.outerWidth : -window.outerWidth }}
							// initial={{ x: window.outerWidth }}
							// animate={{ x: 0 }}
							// exit={{ x: -window.outerWidth }}
							transition={{ type: 'tween', duration: 0.75 }}
							key={sliderIndex}
							gridcolumns={offset}
							custom={back}
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
										<div className="box-info-wrapper">
											<BoxInfo variants={boxInfoVariants}>
												{movie.title}
											</BoxInfo>
										</div>
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
