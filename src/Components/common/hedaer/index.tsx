import React from 'react';
import { motion, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { searchOpenAtom } from '../../../atoms';
import {
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
} from './styles';

function Header() {
	const [searchOpen, setSearchOpen] = useRecoilState(searchOpenAtom);
	const [isscrollZero, setIsScrollZero] = useState(true);
	const { scrollY } = useViewportScroll();
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '') {
			navigate(`/`);
			const searchOpenTimeout = setTimeout(() => {
				setSearchOpen(true);
				var ab = 1;
			}, 1);
			// clearTimeout(searchOpenTimeout);
		} else {
			navigate(`/search?keyword=${e.target.value}`);
		}
	};

	const onNavMenuItemClick = () => {
		setIsMenuOpen(false);
	};

	const onNavItemClick = () => {
		window.scrollTo(0, 0);
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
				<LogoWrapper>
					<Link to="/" aria-label="메인 페이지로 이동">
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
				</LogoWrapper>
				<Items>
					<Item className="sm-only nav-menu">
						<button
							type="button"
							onClick={() => setIsMenuOpen((prev) => !prev)}
						>
							메뉴
						</button>
						{isMenuOpen ? (
							<NavMenu>
								<ul>
									<li onClick={onNavMenuItemClick}>
										<NavLink
											to="/"
											className="nav-menu-item"
											onClick={onNavItemClick}
										>
											홈
										</NavLink>
									</li>
									<li onClick={onNavMenuItemClick}>
										<NavLink
											to="/tv"
											className="nav-menu-item"
											onClick={onNavItemClick}
										>
											시리즈
										</NavLink>
									</li>
									<li onClick={onNavMenuItemClick}>
										<NavLink to="/profile" className="nav-menu-item">
											프로필 선택
										</NavLink>
									</li>
								</ul>
								<div className="tooltip"></div>
							</NavMenu>
						) : null}
					</Item>
					<Item className="sm-hidden">
						<NavLink to="/" className="nav-item" onClick={onNavItemClick}>
							홈
						</NavLink>
					</Item>
					<Item className="sm-hidden">
						<NavLink to="/tv" className="nav-item" onClick={onNavItemClick}>
							시리즈
						</NavLink>
					</Item>
					<Item className="sm-hidden">
						<NavLink to="/profile" className="nav-item">
							프로필 선택
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
						placeholder="두 글자 이상 입력해주세요"
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
