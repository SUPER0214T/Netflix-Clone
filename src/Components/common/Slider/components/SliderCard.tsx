import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IGetMoviesResult, ISearchResults } from '../../../../api';
import { overlayAtom } from '../../../../atoms';
import { makeImagePath } from '../../../../utils';

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

interface ISliderCard {
	data: IGetMoviesResult | ISearchResults | undefined;
	sliderIndex: number;
	offset: number;
}

function SliderCard({ data, sliderIndex, offset }: ISliderCard) {
	const navigate = useNavigate();
	const setOverlayOpen = useSetRecoilState(overlayAtom);
	const location = useLocation();

	const onBoxClick = (movieId: number) => {
		if (location?.pathname === '/') {
			navigate(`/movies/${movieId}`);
		} else if (location?.pathname === '/tv') {
			navigate(`/tv/${movieId}`);
		} else if (location?.pathname.includes('/search')) {
			navigate(`/search/${movieId}`);
		}
	};

	return (
		<>
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
					>
						{/* BoxInfo에도 whileHover가 들어간다. */}
						<div className="box-info-wrapper">
							<BoxInfo variants={boxInfoVariants}>{movie.title}</BoxInfo>
						</div>
					</Box>
				))}
		</>
	);
}

export default SliderCard;
