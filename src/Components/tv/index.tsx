import React from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../../api';
import { makeImagePath } from '../../utils';
import { useMatch } from 'react-router-dom';
import Modal from '../common/modal/index';
import SliderComponent from '../common/Slider/index';
import { useRecoilValue } from 'recoil';
import { overlayAtom } from '../../atoms';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useMovieData, useMovieDataStandard } from '../../Hooks/useMovieData';

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
function Tv() {
	const overlayOpen = useRecoilValue(overlayAtom);
	const movieMatch = useMatch('/tv/:movieId');

	const dataPage01 = useMovieData(1);
	const [dataPage02, isData02Loading] = useMovieDataStandard(2);
	const dataPage04 = useMovieData(4);
	const dataPage07 = useMovieData(7);
	const dataPage08 = useMovieData(8);
	const dataPage09 = useMovieData(9);

	useEffect(() => {
		if (overlayOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [overlayOpen]);

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>시리즈 - 넷플릭스</title>
				</Helmet>
			</HelmetProvider>
			<Wrapper>
				{isData02Loading ? (
					<Loader>로딩중...</Loader>
				) : (
					<>
						<Banner
							bgimagepath={makeImagePath(
								dataPage02?.results[0].backdrop_path || '',
								'w1280'
							)}
						>
							<Info>
								<div>
									<Title>{dataPage02?.results[0].title}</Title>
									<OverView>{dataPage02?.results[0].overview}</OverView>
								</div>
							</Info>
						</Banner>

						<div className="slider-position">
							<SliderComponent
								data={dataPage02}
								titleName="오직 넷플릭스에서"
							/>
							<SliderComponent
								data={dataPage01}
								titleName="평단의 찬사를 받은 시리즈"
							/>
							<SliderComponent data={dataPage04} titleName="" />
							<SliderComponent data={dataPage07} titleName="드라마" />
							<SliderComponent data={dataPage08} titleName="할리우드 영화" />
							<SliderComponent
								data={dataPage09}
								titleName="다시보기 추천 콘텐츠"
							/>
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

export default Tv;
