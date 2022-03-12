import React from 'react';
import { useEffect } from 'react';
import { makeImagePath } from '../../utils';
import { useMatch } from 'react-router-dom';
import Modal from '../common/modal/index';
import SliderComponent from '../common/slider/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { overlayAtom, searchOpenAtom } from '../../atoms';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useMovieData, useMovieDataStandard } from '../../hooks/useMovieData';
import { Wrapper, Loader, Banner, Info, Title, OverView } from './styles';

/* Home Component */
function Home() {
	const overlayOpen = useRecoilValue(overlayAtom);
	const setSearchOpen = useSetRecoilState(searchOpenAtom);
	const movieMatch = useMatch('/movies/:movieId');

	const [dataPage01, isData01Loading] = useMovieDataStandard(1);
	const dataPage02 = useMovieData(2);
	const dataPage03 = useMovieData(3);
	const dataPage04 = useMovieData(4);
	const dataPage05 = useMovieData(5);
	const dataPage06 = useMovieData(6);

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
