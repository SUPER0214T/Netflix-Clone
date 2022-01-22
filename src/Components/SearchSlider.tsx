import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ISearchResults } from '../api';
import { searchOverlayAtom } from '../atoms';
import { makeImagePath } from '../utils';

// Components
const Slider = styled.div`
	position: relative;
	min-height: 120px;
	margin-bottom: 4vw;

	@media screen and (min-width: 1100px) {
		min-height: 11vw;
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
	padding: 0 4%;
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

function SearchSlider(props: {
	data: ISearchResults | undefined;
	offset: number;
	sliderIndex: number;
}) {
	const { data, offset, sliderIndex } = props;
	const navigate = useNavigate();
	const [overlayOpen, setOverlayOpen] = useRecoilState(searchOverlayAtom);

	// Functions
	const onBoxClick = (movieId: number) => {
		navigate(`/search/${movieId}`);
	};

	return (
		<Slider>
			<Row gridcolumns={offset}>
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
			</Row>
		</Slider>
	);
}

export default SearchSlider;
