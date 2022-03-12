import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ISearchResults } from '../../../api';
import SliderCard from '../../common/slider/components/SliderCard';

// Components
const Slider = styled.div`
	position: relative;
	min-height: 120px;
	margin-bottom: 4vw;

	@media screen and (min-width: 1100px) {
		min-height: 11vw;
	}
`;

const Row = styled(motion.div)<{ gridcolumns: number }>`
	display: grid;
	grid-template-columns: repeat(${(props) => props.gridcolumns}, 1fr);
	gap: 10px;
	margin-bottom: 5px;
	position: absolute;
	width: 100%;
	height: 11vw;
	min-height: 120px;
	padding: 0 4%;
`;

function SearchSlider(props: {
	data: ISearchResults | undefined;
	offset: number;
	sliderIndex: number;
}) {
	const { data, offset, sliderIndex } = props;

	return (
		<Slider>
			<Row gridcolumns={offset}>
				<SliderCard data={data} sliderIndex={sliderIndex} offset={offset} />
			</Row>
		</Slider>
	);
}

export default SearchSlider;
