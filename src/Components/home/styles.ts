// home의 styled-components
import styled from 'styled-components';

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

export { Wrapper, Loader, Banner, Info, Title, OverView };
