import React from 'react';
import styled from 'styled-components';
import {
	getMovieVideoURL,
	IDetails,
	IGetMovieVideo,
	IMovies,
} from '../../../../api';
import { makeImagePath } from '../../../../utils';
import { motion } from 'framer-motion';

const MovieInfoWrapper = styled.div`
	padding: 0 48px;

	.episode-info {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		grid-gap: 32px;
		margin-top: 18px;

		&-overview-clamp {
			text-decoration: underline;
			color: #afafaf;
			cursor: pointer;

			&:hover {
				opacity: 0.6;
			}
		}
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

				&-item {
					cursor: pointer;
					&:hover {
						text-decoration: underline;
					}
				}

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
			margin-bottom: 30px;
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
							height: 100%;
							object-fit: cover;
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
					overflow-wrap: break-word;
					display: flex;
					flex-direction: column;
					justify-content: stretch;
					height: 100%;

					&-title {
						padding: 16px;
						font-size: 16px;
						font-weight: 700;
						padding-bottom: 8px;
					}

					&-overview {
						padding: 14px;
						padding-top: 0;
						font-size: 14px;
						line-height: 20px;
						color: #d2d2d2;
					}
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

	.video-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		margin: 0 auto;
		width: 100vw;
		height: 100vh;

		iframe {
			width: 100%;
			height: 100%;
		}

		button {
			position: absolute;
			left: 100px;
			top: 100px;
			background: red;
			border-radius: 50%;
			border: none;
			cursor: pointer;
			transition: transform 0.35s ease-in-out;

			&:hover {
				transform: scale(1.3);
			}

			svg {
				width: 56px;
				height: 56px;
				border: none;
				background: transparent;
				color: white;
			}
		}
	}
`;

interface IMovieInfo {
	onClickOverviewAdd: () => void;
	setVideoOpen: React.Dispatch<React.SetStateAction<string | null>>;
	videoOpen: string | null;
	clickedMovie: IMovies | null;
	details: IDetails | undefined;
	videoData: IGetMovieVideo | undefined;
}

function MovieInfo({
	onClickOverviewAdd,
	setVideoOpen,
	videoOpen,
	clickedMovie,
	details,
	videoData,
}: IMovieInfo) {
	return (
		<MovieInfoWrapper>
			<div className="episode-info">
				<div className="episode-info-left">
					<div className="episode-info-left-release">
						{clickedMovie?.release_date.substring(0, 4) ||
							details?.release_date.substring(0, 4)}
					</div>
					<div className="episode-info-left-overview">
						{clickedMovie?.overview || details?.overview}
					</div>
					{details?.overview ? (
						details.overview.length > 102 ? (
							<span
								className="episode-info-overview-clamp"
								onClick={(e) => {
									e.currentTarget.style.display = 'none';
									onClickOverviewAdd();
								}}
							>
								...?????????
							</span>
						) : (
							false
						)
					) : (
						false
					)}
				</div>
				<div className="episode-info-right">
					<div className="tags">
						<span className="tags-label">??????: </span>
						{details?.genres.map((genre) => (
							<span key={genre.id} className="tags-item">
								{genre.name}
							</span>
						))}
					</div>
				</div>
			</div>
			<div className="episodeSelector">
				<div className="episodeSelector-header">
					<h2>??????</h2>
					<h3>?????? 1</h3>
				</div>
				<div className="episodeSelector-cards">
					{videoData?.results.length !== 0 ? (
						videoData?.results.map((result, index) => {
							return (
								<div
									className="episodeSelector-card"
									key={result.id}
									onClick={() => setVideoOpen(result.key)}
								>
									<div className="card-index">{index + 1}</div>
									<div className="card-image-wrapper">
										<div className="card-image">
											<img
												src={makeImagePath(
													clickedMovie?.backdrop_path ||
														clickedMovie?.poster_path ||
														details?.backdrop_path ||
														details?.poster_path ||
														'',
													'w780'
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
										<p className="card-info-title">{index + 1}???</p>
										<p className="card-info-overview">{result.name}</p>
									</div>
								</div>
							);
						})
					) : (
						<div className="no-list">
							<h3>????????? ????????????.</h3>
						</div>
					)}
				</div>
			</div>

			{videoOpen !== null ? (
				videoData ? (
					<div className="video-wrapper">
						<motion.iframe
							width="100%"
							height="500px"
							src={getMovieVideoURL(videoOpen || '')}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							className="videoPlayer"
						></motion.iframe>
						<button type="button" onClick={() => setVideoOpen(null)}>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M11.707 6.707a1 1 0 00-1.414-1.414l-6 6a1 1 0 000 1.415l6 6a1 1 0 001.414-1.415L7.414 13H19a1 1 0 100-2H7.414l4.293-4.293z"
									fill="currentColor"
								></path>
							</svg>
						</button>
					</div>
				) : (
					<h1>Loading...</h1>
				)
			) : null}
		</MovieInfoWrapper>
	);
}

export default MovieInfo;
