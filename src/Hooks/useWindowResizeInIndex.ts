// Slider의 index.tsx에서 사용되는 resize를 Custom Hook으로 빼낸 것
// 폴더 변경한 후에 useWindowResize로 이름 변경해야 함
import { throttle } from 'lodash';
import { useEffect } from 'react';

type TSetOffset = React.Dispatch<React.SetStateAction<number>>;

export function useWindowResizeInIndex(setOffset: TSetOffset) {
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
