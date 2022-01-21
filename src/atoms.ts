import { atom } from 'recoil';

export const overlayAtom = atom<boolean>({
	key: 'overlayAtom',
	default: false,
});

export const searchOverlayAtom = atom<boolean>({
	key: 'searchOverlayAtom',
	default: false,
});

export const searchInputValueAtom = atom<string>({
	key: 'searchInputValueAtom',
	default: '',
});

export const searchOpenAtom = atom<boolean>({
	key: 'searchOpenAtom',
	default: false,
});
