import React from 'react';
import { useEffect } from 'react';
import { makeImagePath } from '../../utils';
import { useMatch } from 'react-router-dom';
import Modal from '../common/modal/index';
import SliderComponent from '../common/slider/index';
import { useRecoilValue } from 'recoil';
import { overlayAtom } from '../../atoms';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useMovieData, useMovieDataStandard } from '../../Hooks/useMovieData';
import { Wrapper, Loader, Banner, Info, Title, OverView } from './styles';

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
