import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { makeImagePath } from '../../utils';
import { IDetails, IMovies } from '../../api';

const Img = styled.div`
	width: 100%;
	position: relative;

	.close-modal-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 16px;
		right: 16px;
		width: 36px;
		height: 36px;
		background-color: #181818;
		border-radius: 50%;
		padding: 8px;
		cursor: pointer;

		button {
			cursor: pointer;
			pointer-events: none;
			z-index: 1000;
		}

		svg {
			pointer-events: none;
		}
	}

	.modal-img-wrapper {
		img {
			width: 100%;
		}
	}

	.modal-image-gradient {
		width: 100%;
		height: 150px;
		position: absolute;
		bottom: 0;
		background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
		pointer-events: none;
	}

	.modal-image-title {
		position: absolute;
		bottom: 20%;
		padding: 0 48px;
		pointer-events: none;

		h2 {
			font-size: 3vw;
			font-weight: 700;
			line-height: normal;
			text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);
		}
	}
`;

interface IModalImage {
	onClickModalClose: () => void;
	onClickModalImg: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	clickedMovie: IMovies | null;
	details: IDetails | undefined;
}

function ModalImage({
	onClickModalClose,
	onClickModalImg,
	clickedMovie,
	details,
}: IModalImage) {
	return (
		<Img>
			<div className="close-modal-btn" onClick={onClickModalClose}>
				<button>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						role="button"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z"
							fill="currentColor"
						></path>
					</svg>
				</button>
			</div>
			<div className="modal-img-wrapper">
				<motion.img
					src={makeImagePath(
						clickedMovie?.backdrop_path ||
							clickedMovie?.poster_path ||
							details?.backdrop_path ||
							details?.poster_path ||
							'',
						'w1280'
					)}
					alt="Modal Title Img"
					onClick={(e) => {
						if (e.currentTarget.className !== 'close-modal-btn') {
							onClickModalImg(e);
						}
					}}
				/>
			</div>
			<div className="modal-image-gradient" />
			<div className="modal-image-title">
				<h2>{clickedMovie?.title || details?.title}</h2>
			</div>
		</Img>
	);
}

export default ModalImage;
