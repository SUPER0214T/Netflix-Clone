import { atom } from 'recoil';

export const overlayAtom = atom<boolean>({
	key: 'overlayAtom',
	default: false,
});
