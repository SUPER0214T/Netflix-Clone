import { throttle } from 'lodash';
import { useEffect } from 'react';
import { ISearchResults } from '../../../api';

type TSearchData = ISearchResults | undefined;
type TOffset = number;
type TSetOffset = React.Dispatch<React.SetStateAction<number>>;
type TSetSliderIndex = React.Dispatch<React.SetStateAction<number>>;

export function useWindowResize(
	searchData: TSearchData,
	offset: TOffset,
	setOffset: TSetOffset,
	setSliderIndex: TSetSliderIndex
) {
	const handleResize = throttle(() => {
		const totalMovies = searchData?.results.length || 20;
		const maxIndex = Math.floor(totalMovies / offset) - 1;
		if (window.outerWidth >= 1400) {
			setOffset(6);
			setSliderIndex(maxIndex);
		} else if (window.outerWidth >= 1100) {
			setOffset(5);
			setSliderIndex(maxIndex);
		} else if (window.outerWidth >= 800) {
			setOffset(4);
			setSliderIndex(maxIndex);
		} else if (window.outerWidth >= 500) {
			setOffset(3);
			setSliderIndex(maxIndex);
		} else {
			setOffset(2);
			setSliderIndex(maxIndex);
		}
	}, 200);

	useEffect(() => {
		handleResize();
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
}
