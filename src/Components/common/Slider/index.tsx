import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IGetMoviesResult, ISearchResults } from '../../../api';
import SliderCard from './components/SliderCard';
import ArrowButton from './components/ArrowButton';
import { useWindowResizeInIndex } from '../../../Hooks/useWindowResizeInIndex';
import { SliderWrapper, Slider, Row, sliderVariants } from './styles';

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
