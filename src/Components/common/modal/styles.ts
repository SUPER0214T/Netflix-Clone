import { motion } from 'framer-motion';
import styled from 'styled-components';

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

export { MovieModalWrapper, MovieModal, Overlay };
