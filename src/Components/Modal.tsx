import { motion, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import {
	getMovieVideoData,
	getMovieVideoURL,
	IGetMoviesResult,
	IGetMovieVideo,
} from '../api';
import { makeImagePath } from '../utils';

const MovieModalWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	overflow-y: scroll;
`;

const MovieModal = styled.div`
	position: absolute;
	width: 850px;
	height: 200vh;
	z-index: 100;
	background-color: black;
	overflow-y: scroll;
	border-radius: 6px;

	@media screen and (max-width: 850px) {
		width: 95%;
	}
`;

const ModalCover = styled.div``;

const ModalImg = styled.div`
	width: 100%;
	img {
		width: 100%;
	}
`;

const ModalTitle = styled.h2``;

function Modal(props: { data: IGetMoviesResult }) {
	const [videoData, setVideoData] = useState<IGetMovieVideo>();
	const { scrollY } = useViewportScroll();
	const movieMatch = useMatch('/movies/:movieId');

	const clickedMovie = props.data?.results.find((movie) => {
		if (!movieMatch) return null;
		return movie.id + '' === movieMatch.params.movieId;
	});

	useEffect(() => {
		const getVideoDB = getMovieVideoData(Number(movieMatch?.params.movieId));
		getVideoDB.then((result) => setVideoData(result));
		console.log(videoData);
	}, []);

	console.log(videoData);
	return (
		<MovieModalWrapper>
			<MovieModal style={{ top: scrollY.get() + 30 }}>
				<ModalCover>
					<ModalImg>
						<motion.img
							src={makeImagePath(clickedMovie?.backdrop_path || '')}
							alt=""
						/>
					</ModalImg>
					<ModalTitle>{clickedMovie?.title}</ModalTitle>
					<ModalTitle>{clickedMovie?.overview}</ModalTitle>
					{videoData?.results.length !== 0 ? (
						videoData?.results.map((result) => {
							return <h1>{result.name}</h1>;
						})
					) : (
						<h1>목록이 없습니다.</h1>
					)}
					{videoData ? (
						<motion.iframe
							width="100%"
							height="500px"
							src={getMovieVideoURL(videoData?.results[0]?.key || '')}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							className="videoPlayer"
						></motion.iframe>
					) : (
						<h1>Loading...</h1>
					)}
				</ModalCover>
			</MovieModal>
		</MovieModalWrapper>
	);
}

export default Modal;
