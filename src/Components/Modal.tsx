import { motion, useViewportScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import {
	getMovieDetails,
	getMovieVideoData,
	getMovieVideoURL,
	IDetails,
	IGetMoviesResult,
	IGetMovieVideo,
} from '../api';
import { makeImagePath } from '../utils';

const MovieModalWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	overflow-y: scroll;
`;

const MovieModal = styled.div`
	position: absolute;
	width: 850px;
	z-index: 100;
	top: 30px;
	background-color: black;
	border-radius: 6px;
	overflow: hidden;
	height: auto;

	@media screen and (max-width: 850px) {
		width: 95%;
	}
`;

const ModalImg = styled.div`
	width: 100%;
	img {
		width: 100%;
	}
`;

const MovieInfoWrapper = styled.div`
	padding: 0 48px;

	.episode-info {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		grid-gap: 32px;
		margin-top: 18px;

		&-left-release {
			font-size: 16px;
			font-weight: 700;
		}

		&-left-overview {
			line-height: 27px;
			font-size: 18px;
			font-weight: 400;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			margin-top: 18px;
		}

		&-right {
			.tags {
				overflow-wrap: break-all;
				font-size: 14px;
				line-height: 20px;

				&-label {
					color: #777;
				}

				&-item:not(:last-child)::after {
					content: ', ';
				}
			}
		}
	}

	.episodeSelector {
		.episodeSelector-header {
			display: flex;
			justify-content: space-between;
			align-items: baseline;

			h2 {
				font-weight: 700;
				font-size: 24px;
				margin-top: 48px;
				margin-bottom: 20px;
			}

			h3 {
				font-size: 18px;
			}
		}

		.episodeSelector-cards {
			.episodeSelector-card {
				display: flex;
				padding: 16px;
				min-height: 150px;
				align-items: center;
				justify-content: left;
				border-radius: 6px;
				cursor: pointer;
				border-bottom: 1px solid #404040;

				.card-index {
					flex: 0 0 7%;
					display: flex;
					justify-content: center;
					font-size: 24px;
					color: #d2d2d2;
				}

				.card-image-wrapper {
					flex: 0 0 18%;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;

					.card-image {
						border-radius: 6px;
						overflow: hidden;

						img {
							display: block;
							width: 100%;
						}
					}

					.play-icon {
						position: absolute;
						display: flex;
						justify-content: center;
						align-items: center;
						opacity: 0;
						transition: opacity 0.35s ease-in-out;

						.playSVG {
							width: 48px;
							height: 48px;
							padding: 8px;
							border-radius: 50%;
							border: 1px solid white;
							background-color: rgba(30, 30, 20, 0.5);
						}
					}
				}

				.card-info {
					flex: 0 0 70%;
					font-size: 16px;
					font-weight: 700;
					overflow-wrap: break-word;
					padding: 16px;
				}

				&:first-child {
					background-color: #333;
				}

				&:hover {
					.card-image-wrapper {
						.play-icon {
							opacity: 1;
						}
					}
				}
			}
		}
	}
`;

const ModalTitle = styled.h2``;

function Modal(props: { data: IGetMoviesResult }) {
	const [videoData, setVideoData] = useState<IGetMovieVideo>();
	const [details, setDetails] = useState<IDetails>();
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

		const getDetails = getMovieDetails(Number(movieMatch?.params.movieId));
		getDetails.then((result) => setDetails(result));
	}, []);

	console.log(videoData);
	return (
		<MovieModalWrapper style={{ top: scrollY.get() }}>
			<MovieModal>
				<ModalImg>
					<motion.img
						src={makeImagePath(clickedMovie?.backdrop_path || '')}
						alt="Modal Title Img"
					/>
					<ModalTitle>{clickedMovie?.title}</ModalTitle>
				</ModalImg>
				<MovieInfoWrapper>
					<div className="episode-info">
						<div className="episode-info-left">
							<div className="episode-info-left-release">
								{clickedMovie?.release_date.substring(0, 4)}
							</div>
							<div className="episode-info-left-overview">
								{clickedMovie?.overview}
							</div>
						</div>
						<div className="episode-info-right">
							<div className="tags">
								<span className="tags-label">장르: </span>
								<span className="tags-item">
									어두운, 로맨스, 무서운, 재미있는, 한국 드라마 TOP10
								</span>
								<span className="tags-item">로맨스</span>
								<span className="tags-item">무서운</span>
								<span className="tags-item">재미있는</span>
								<span className="tags-item">한국 드라마 TOP10</span>
								{/* 장르 가져와서 map으로 돌린 후 <span className='tag-name'>{genres.genre.name}</span> */}
							</div>
						</div>
					</div>
					<div className="episodeSelector">
						<div className="episodeSelector-header">
							<h2>회차</h2>
							<h3>시즌 1</h3>
						</div>
						<div className="episodeSelector-cards">
							{videoData?.results.length !== 0 ? (
								videoData?.results.map((result, index) => {
									return (
										<div className="episodeSelector-card" key={result.id}>
											<div className="card-index">{index + 1}</div>
											<div className="card-image-wrapper">
												<div className="card-image">
													<img
														src={makeImagePath(
															clickedMovie?.backdrop_path || ''
														)}
														alt="Card Img"
													/>
												</div>
												<div className="play-icon">
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="playSVG"
													>
														<path
															d="M3 2.69127C3 1.93067 3.81547 1.44851 4.48192 1.81506L21.4069 11.1238C22.0977 11.5037 22.0977 12.4963 21.4069 12.8762L4.48192 22.1849C3.81546 22.5515 3 22.0693 3 21.3087V2.69127Z"
															fill="currentColor"
														></path>
													</svg>
												</div>
											</div>
											<div className="card-info">
												<p>{result.name}</p>
											</div>
										</div>
									);
								})
							) : (
								<div className="no-list">
									<h3>목록이 없습니다.</h3>
								</div>
							)}
						</div>
					</div>

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
				</MovieInfoWrapper>
			</MovieModal>
		</MovieModalWrapper>
	);
}

export default Modal;
