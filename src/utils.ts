const DEFAULT_IMG_PATH =
	'https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png';

export function makeImagePath(id: string, format?: string) {
	return id !== '' && id !== null
		? `https://image.tmdb.org/t/p/${format ? format : 'w500'}${id}`
		: DEFAULT_IMG_PATH;
}
