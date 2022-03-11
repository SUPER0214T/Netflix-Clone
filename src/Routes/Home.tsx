import React from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { useMatch } from 'react-router-dom';
import Modal from '../Components/Modal/index';
import SliderComponent from '../Components/common/Slider/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { overlayAtom, searchOpenAtom } from '../atoms';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const Wrapper = styled.div`
	position: relative;
	overflow: hidden;
	background-color: black;

	.slider-position {
		position: relative;
		top: -15vw;
	}
`;

const Loader = styled.div`
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 5vw;
`;

const Banner = styled.div<{ bgimagepath: string }>`
	width: 100%;
	height: 56.25vw;
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
	bottom: 38%;
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
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

/* Home Component */
function Home() {
	const overlayOpen = useRecoilValue(overlayAtom);
	const setSearchOpen = useSetRecoilState(searchOpenAtom);
	const movieMatch = useMatch('/movies/:movieId');
	const { data: dataPage01, isLoading: isData01Loading } =
		useQuery<IGetMoviesResult>(['movies', 'page01'], () => getMovies(1));

	const { data: dataPage02 } = useQuery<IGetMoviesResult>(
		['movies', 'page02'],
		() => getMovies(2)
	);

	const { data: dataPage03 } = useQuery<IGetMoviesResult>(
		['movies', 'page03'],
		() => getMovies(3)
	);

	const { data: dataPage04 } = useQuery<IGetMoviesResult>(
		['movies', 'page04'],
		() => getMovies(4)
	);

	const { data: dataPage05 } = useQuery<IGetMoviesResult>(
		['movies', 'page05'],
		() => getMovies(5)
	);

	const { data: dataPage06 } = useQuery<IGetMoviesResult>(
		['movies', 'page06'],
		() => getMovies(6)
	);

	useEffect(() => {
		if (overlayOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [overlayOpen]);

	useEffect(() => {
		setSearchOpen(false);
	}, []);

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>홈 - 넷플릭스</title>
				</Helmet>
			</HelmetProvider>

			<Wrapper>
				{isData01Loading ? (
					<Loader>로딩중...</Loader>
				) : (
					<>
						<Banner
							bgimagepath={makeImagePath(
								dataPage01?.results[0].backdrop_path || '',
								'w1280'
							)}
						>
							<Info>
								<div>
									<Title>{dataPage01?.results[0].title}</Title>
									<OverView>{dataPage01?.results[0].overview}</OverView>
								</div>
							</Info>
						</Banner>

						<div className="slider-position">
							<SliderComponent data={dataPage01} titleName="지금 뜨는 콘텐츠" />
							<SliderComponent
								data={dataPage02}
								titleName="다시보기 추천 콘텐츠"
							/>
							<SliderComponent
								data={dataPage03}
								titleName="몰아보기 추천 시리즈"
							/>
							<SliderComponent data={dataPage04} titleName="해외 시리즈" />
							<SliderComponent data={dataPage05} titleName="국내 시리즈" />
							<SliderComponent data={dataPage06} titleName="" />
						</div>
					</>
				)}

				{movieMatch ? (
					<>
						{overlayOpen ? (
							dataPage01 ? (
								<Modal data={dataPage01} />
							) : (
								<h1>Loading...</h1>
							)
						) : null}
					</>
				) : null}
			</Wrapper>
		</>
	);
}

export default Home;
