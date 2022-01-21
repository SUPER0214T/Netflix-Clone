import React from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IGetMoviesResult, ISearchResults } from '../api';
import { overlayAtom } from '../atoms';
import { makeImagePath } from '../utils';

const SliderWrapper = styled.div`
	margin: 3vw 0;

	.slider-header-title {
		color: #e5e5e5;
		font-weight: 700;
		font-size: 1.4vw;
		padding: 0 5px;
		margin-bottom: 8px;
	}
`;

const Slider = styled.div`
	position: relative;
	min-height: 11vw;

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

		@media screen and (max-width: 1100px) {
			width: 6%;
		}

		@media screen and (max-width: 800px) {
			width: 9%;
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

	@media screen and (max-width: 1100px) {
		min-height: 120px;
	}
`;

const Row = styled(motion.div)<{ gridcolumns: number }>`
	display: grid;
	grid-template-columns: repeat(${(props) => props.gridcolumns}, 1fr);
	gap: 10px;
	margin-bottom: 5px;
	position: absolute;
	width: 100%;
	height: 11vw;
	min-height: 120px;
	padding: 5px;
`;

const Box = styled(motion.div)<{ bgimagepath: string }>`
	background-color: black;
	border-top-left-radius: 0.2vw;
	border-top-right-radius: 0.2vw;
	background-image: url(${(props) => props.bgimagepath});
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	cursor: pointer;

	&:last-child {
		transform-origin: right;
	}

	&:first-child {
		transform-origin: left;
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
	background-color: ${(props) => props.theme.black.veryDark};
	bottom: calc(-50% + 1px);
	width: 100%;
	height: 50%;
	opacity: 0;
	visibility: hidden;
	transition: visibility 0.35s ease-in-out;
	border-bottom-right-radius: 0.2vw;
	border-bottom-left-radius: 0.2vw;
`;

// Variants
const sliderVariants: Variants = {
	hidden: (isBack: Boolean) => ({
		x: isBack ? -window.outerWidth : window.outerWidth,
	}),
	visible: { x: 0 },
	exit: (isBack: Boolean) => ({
		x: isBack ? window.outerWidth : -window.outerWidth,
	}),
};

const boxVariants: Variants = {
	normal: { scale: 1 },
	hover: {
		scale: 1.5,
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

function SliderComponent(props: {
	data: IGetMoviesResult | ISearchResults | undefined;
	titleName?: string;
}) {
	const { data, titleName } = props;
	const [sliderIndex, setSliderIndex] = useState(0);
	const [back, setBack] = useState(false);
	const [sliderLimit, setSliderLimit] = useState(false);
	const [offset, setOffset] = useState(6);
	const navigate = useNavigate();
	const [overlayOpen, setOverlayOpen] = useRecoilState(overlayAtom);

	// Functions
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

	const onBoxClick = (movieId: number) => {
		navigate(`/movies/${movieId}`);
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
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<SliderWrapper className="slider-wrapper">
			<div className="slider-header-title">
				<h2>{titleName || '영화'}</h2>
			</div>

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
										<BoxInfo variants={boxInfoVariants}>{movie.title}</BoxInfo>
									</div>
								</Box>
							))}
					</Row>
				</AnimatePresence>
			</Slider>
		</SliderWrapper>
	);
}

export default SliderComponent;
