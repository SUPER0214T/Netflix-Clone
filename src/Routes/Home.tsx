import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { debounce, throttle } from 'lodash';

const Wrapper = styled.div``;

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

const Slider = styled.div``;

const Row = styled(motion.div)<{ gridcolumns: number }>`
	display: grid;
	grid-template-columns: repeat(${(props) => props.gridcolumns}, 1fr);
	gap: 10px;
	margin-bottom: 5px;
	position: absolute;
	width: 100%;
`;

const Box = styled(motion.div)<{ bgimagepath: string }>`
	background-color: #fff;
	height: 200px;
	border-radius: 0.2vw;
	background-image: url(${(props) => props.bgimagepath});
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;

	&:first-child {
		transform-origin: left;
	}

	&:last-child {
		transform-origin: right;
	}
`;

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

function Home() {
	const [sliderIndex, setSliderIndex] = useState(0);
	const [sliderLimit, setSliderLimit] = useState(false);
	const [offset, setOffset] = useState(6);

	const { data, isLoading } = useQuery<IGetMoviesResult>(
		['movies', 'nowPlaying'],
		getMovies
	);

	const increaseSliderIndex = () => {
		if (sliderLimit) return;
		setSliderLimit(true);
		console.log(1234);
		if (data) {
			const totalMovies = data?.results.length;
			const maxIndex = Math.floor(totalMovies / offset);
			console.log(offset);
			setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};

	const toggleSliderLimit = () => {
		setSliderLimit(false);
	};

	const handleResize = throttle(() => {
		console.log(window.outerWidth);
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
			</Wrapper>
			<Slider>
				<AnimatePresence initial={false} onExitComplete={toggleSliderLimit}>
					<Row
						variants={sliderVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						transition={{ type: 'tween', duration: 1 }}
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
								></Box>
							))}
					</Row>
				</AnimatePresence>
			</Slider>
		</>
	);
}

export default Home;
