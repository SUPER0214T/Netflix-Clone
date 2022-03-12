import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

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

export { SliderWrapper, Slider, Row, sliderVariants };
