import React from 'react';
import { motion, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { searchOpenAtom } from '../atoms';

const Nav = styled(motion.nav)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	width: 100%;
	top: 0;
	background-color: black;
	height: 68px;
	font-size: 12px;
	padding: 0 4%;
	z-index: 2;
	font-size: 14px;

	@media screen and (max-width: 950px) {
		height: 41px;
		font-size: 10px;
	}
`;

const Col = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled(motion.svg)`
	margin-right: 50px;
	width: 95px;
	height: 25px;
	fill: ${(props) => props.theme.red};
	path {
		stroke-width: 6px;
		stroke: white;
	}
`;

const Items = styled.ul`
	display: flex;
	align-items: center;
`;

const Item = styled.li`
	margin-right: 20px;
	transition: opacity 0.35s ease-in-out;
	position: relative;
	display: flex;
	justify-content: center;
	flex-direction: column;

	a {
		color: ${(props) => props.theme.white.lighter};
	}

	&:hover {
		a:not(.active) {
			opacity: 0.5;
		}
	}

	a.active {
		pointer-events: none;
		font-weight: 700;
		color: ${(props) => props.theme.white.darker};
	}
`;

const Search = styled.span`
	position: relative;
	display: flex;
	align-items: center;
	color: white;

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

const Circle = styled(motion.div)`
	/* position: absolute;
	bottom: -10px;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 5px;
	height: 5px;
	background-color: ${(props) => props.theme.red};
	border-radius: 100%; */
`;

// Variants
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

function Header() {
	const [searchOpen, setSearchOpen] = useRecoilState(searchOpenAtom);
	const [isscrollZero, setIsScrollZero] = useState(true);
	const { scrollY } = useViewportScroll();
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');

	const openSearch = () => {
		setSearchOpen((prev) => !prev);
	};

	const closeSearch = () => {
		if (inputValue === '' || inputValue === null) {
			setSearchOpen(false);
		}
	};

	useEffect(() => {
		if (searchOpen === true) {
			const inputElement: HTMLElement = document.querySelector('input')!;
			inputElement.focus();
		}
	}, [searchOpen]);

	useEffect(() => {
		scrollY.onChange(() => {
			if (scrollY.get() > 1) {
				setIsScrollZero(false);
			} else {
				setIsScrollZero(true);
			}
		});
	}, [scrollY]);

	const onInputChange = (e: any) => {
		if (e.target.value === '') {
			navigate(`/`);
		} else {
			navigate(`/search?keyword=${e.target.value}`);
		}
	};

	return (
		<Nav
			animate={{
				background: isscrollZero
					? 'rgba(20, 20, 20, .1)'
					: 'rgba(20, 20, 20, 1)',
				backgroundImage: isscrollZero
					? 'linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0))'
					: 'linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0))',
			}}
		>
			<Col>
				<Link to="/">
					<Logo
						variants={logoVariants}
						whileHover="active"
						initial="normal"
						xmlns="http://www.w3.org/2000/svg"
						width="1024"
						height="276.742"
						viewBox="0 0 1024 276.742"
					>
						<motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
					</Logo>
				</Link>
				<Items>
					<Item>
						<NavLink to="/">
							홈 <Circle />
						</NavLink>
					</Item>
					<Item>
						<NavLink to="/tv">
							시리즈 <Circle />
						</NavLink>
					</Item>
					<Item>
						<NavLink to="/profile">
							프로필 선택 <Circle />
						</NavLink>
					</Item>
				</Items>
			</Col>
			<Col>
				<Search>
					<motion.svg
						onClick={openSearch}
						animate={{ x: searchOpen ? '-195px' : 0 }}
						transition={{ type: 'linear' }}
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clipRule="evenodd"
						></path>
					</motion.svg>
					<Input
						initial={false}
						animate={{ scaleX: searchOpen ? 1 : 0 }}
						transition={{ type: 'linear' }}
						onBlur={closeSearch}
						placeholder="두 글자 이상"
						onChange={(e) => {
							onInputChange(e);
							setInputValue(e.target.value);
						}}
						value={inputValue}
					/>
				</Search>
			</Col>
		</Nav>
	);
}

export default Header;
