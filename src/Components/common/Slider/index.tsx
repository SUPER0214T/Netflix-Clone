import React from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IGetMoviesResult, ISearchResults } from '../../../api';
import SliderCard from './SliderCard';
import ArrowButton from './ArrowButton';
import { useWindowResizeInIndex } from '../../../Hooks/useWindowResizeInIndex';

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
		height: calc(100% - 10px);
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
		top: 5px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.slider-right {
		right: 0;
		top: 5px;
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

function SliderComponent(props: {
	data: IGetMoviesResult | ISearchResults | undefined;
	titleName?: string;
}) {
	const { data, titleName } = props;
	const [sliderIndex, setSliderIndex] = useState(0);
	const [back, setBack] = useState(false);
	const [sliderLimit, setSliderLimit] = useState(false);
	const [offset, setOffset] = useState(6);

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

	useWindowResizeInIndex(setOffset);

	return (
		<SliderWrapper className="slider-wrapper">
			<div className="slider-header-title">
				<h2>{titleName || '영화'}</h2>
			</div>

			<Slider>
				<ArrowButton
					decreaseSliderIndex={decreaseSliderIndex}
					increaseSliderIndex={increaseSliderIndex}
				/>
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
						<SliderCard data={data} sliderIndex={sliderIndex} offset={offset} />
					</Row>
				</AnimatePresence>
			</Slider>
		</SliderWrapper>
	);
}

export default SliderComponent;
