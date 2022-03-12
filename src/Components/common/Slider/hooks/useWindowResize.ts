import { throttle } from 'lodash';
import { useEffect } from 'react';

type TSetOffset = React.Dispatch<React.SetStateAction<number>>;

export function useWindowResize(setOffset: TSetOffset) {
	const handleResize = throttle(() => {
		if (window.outerWidth >= 1400) {
			setOffset(6);
		} else if (window.outerWidth >= 1100) {
			setOffset(5);
		} else if (window.outerWidth >= 800) {
			setOffset(4);
		} else if (window.outerWidth >= 500) {
			setOffset(3);
		} else {
			setOffset(2);
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
