import { motion } from 'framer-motion';
import styled from 'styled-components';

const Nav = styled(motion.nav)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	width: 100%;
	top: 0;
	background-color: black;
	height: 41px;
	font-size: 10px;
	padding: 0 4%;
	z-index: 2;

	@media screen and (min-width: 950px) {
		height: 68px;
		font-size: 14px;
	}
`;

const Col = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled(motion.svg)`
	width: 95px;
	height: 25px;
	fill: ${(props) => props.theme.red};
	path {
		stroke-width: 6px;
		stroke: white;
	}
`;

const LogoWrapper = styled.div`
	margin-right: 5px;
	display: flex;
	justify-content: center;
	align-items: center;

	@media screen and (min-width: 1150px) {
		margin-right: 25px;
	}
`;

const Items = styled.ul`
	display: flex;
	align-items: center;
`;

const Item = styled.li`
	margin-left: 18px;
	transition: opacity 0.35s ease-in-out;
	position: relative;
	display: flex;
	justify-content: center;
	flex-direction: column;

	@media screen and (min-width: 1330px) {
		margin-left: 20px;
	}

	.nav-item {
		color: ${(props) => props.theme.white.lighter};
		transition: opacity 0.35s ease-in-out;
	}

	&:hover {
		.nav-item:not(.active) {
			opacity: 0.5;
		}
	}

	&:active {
		.nav-item:not(.active) {
			opacity: 0.5;
		}
	}

	.nav-item.active {
		cursor: default;
		font-weight: 700;
		color: ${(props) => props.theme.white.darker};
	}

	&.nav-menu {
		button {
			font-size: 10px;
			font-weight: 700;
			cursor: pointer;
		}
	}
`;

const Search = styled.span`
	position: relative;
	display: flex;
	align-items: center;
	color: white;
	z-index: 2;

	svg {
		cursor: pointer;
		height: 25px;
	}
`;

const Input = styled(motion.input)`
	transform-origin: right center;
	position: absolute;
	left: -200px;
	padding: 7px 14px 7px 7px;
	z-index: -1;
	background-color: ${(props) => props.theme.black.darker};
	padding-left: 30px;
	color: white;
	border: 1px solid ${(props) => props.theme.white.lighter};
	font-size: 14px;

	&:focus {
		outline: none;
	}
`;

const NavMenu = styled.div`
	position: absolute;
	top: 50px;
	margin-left: -90px;
	background-color: rgba(0, 0, 0, 0.9);

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-top: 2px solid white;
	}

	li {
		font-size: 13px;
		font-weight: 700;
		line-height: 24px;

		.nav-menu-item {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 260px;
			height: 50px;

			&:not(.active) {
				opacity: 0.5;
			}

			&:hover,
			&:active {
				opacity: 1;
			}
		}
	}

	.tooltip {
		display: block;
		width: 0;
		height: 0;
		border: 7px solid transparent;
		border-bottom-color: white;
		position: absolute;
		top: -14px;
		left: 50%;
		transform: translateX(-50%);
	}
`;

const logoVariants = {
	normal: {
		fillOpacity: 1,
	},
	active: {
		fillOpacity: [1, 0, 1],
		transition: {
			repeat: Infinity,
			duration: 4,
		},
	},
};

export {
	Nav,
	Col,
	Logo,
	LogoWrapper,
	Items,
	Item,
	Search,
	Input,
	NavMenu,
	logoVariants,
};
