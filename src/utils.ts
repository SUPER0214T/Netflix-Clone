export function makeImagePath(id: string, format?: string) {
	return id !== ''
		? `https://image.tmdb.org/t/p/${format ? format : 'original'}${id}`
		: 'none';
}
