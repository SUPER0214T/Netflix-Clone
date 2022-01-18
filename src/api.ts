const API_KEY = 'd71e59939752809aacb08c573188d676';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovies {
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_title: string;
	overview: string;
	poster_path: string;
	release_date: string;
	title: string;
}

export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	results: IMovies[];
}

// interface IVideos {
// name: "[매트릭스: 리저렉션] 네오의 선택 영상",
// key: "jRZ5V812OZo",
// id: "61c823e9a93d25001c286277"
// }

interface IVideos {
	name: string;
	key: string;
	id: string;
}

export interface IGetMovieVideo {
	id: number;
	results: IVideos[];
}

export function getMovies() {
	return fetch(
		`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
	).then((response) => response.json());
}

export function getMovieDetails(movieId: number) {
	return fetch(
		`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
	).then((response) => response.json());
}

export function getMovieVideoData(movieId: number) {
	return fetch(`
	${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`).then(
		(res) => res.json()
	);
}

export function getMovieVideoURL(movieKey: string) {
	return `https://www.youtube.com/embed/${movieKey}`;
}
