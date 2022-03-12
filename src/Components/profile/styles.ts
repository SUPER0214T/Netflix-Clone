import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.profiles {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 80%;

		&-header {
			font-size: 3.5vw;
			font-weight: 400;
			margin: 3vw 0;
		}

		&-list {
			display: flex;
		}

		&-item {
			.profile {
				width: 10vw;
				min-width: 84px;
				max-width: 200px;
				cursor: pointer;

				&-img {
					height: 10vw;
					width: 100%;
					max-height: 200px;
					min-height: 84px;
					border: 1px solid transparent;
					/* background-image: url(); */
					background-position: center center;
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 4px;
					overflow: hidden;

					&.red {
						background-color: red;
					}

					&.green {
						background-color: green;
					}

					&.blue {
						background-color: blue;
					}
				}

				&-name {
					display: block;
					width: 100%;
					min-height: 22px;
					font-size: 1.3vw;
					color: grey;
					line-height: 1.5;
					padding-top: 1vw;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			&:not(:last-child) {
				margin-right: 2vw;
			}

			&:hover,
			&:active {
				.profile {
					&-img {
						border-color: white;
					}

					&-name {
						color: white;
					}
				}
			}
		}

		&-manager {
			border: 1px solid grey;
			background: transparent;

			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			margin-top: 32px;

			span {
				display: block;
				letter-spacing: 2px;
				font-size: 1.2vw;
				color: grey;
				padding: 8px 24px;
			}

			&:hover,
			&:active {
				border-color: white;

				span {
					color: white;
				}
			}
		}
	}
`;

export { Wrapper };
