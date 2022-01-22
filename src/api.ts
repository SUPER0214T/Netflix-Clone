const API_KEY = process.env.REACT_APP_API_KEY;
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

interface IVideos {
	name: string;
	key: string;
	id: string;
}

export interface IGetMovieVideo {
	id: number;
	results: IVideos[];
}

interface IGenres {
	id: number;
	name: string;
}

export interface IDetails {
	genres: IGenres[];
	tagline: string;
	release_date: string;
	runtime: number;
	title: string;
	overview: string;
	backdrop_path: string;
	poster_path: string;
}

export interface ISearchResults {
	page: number;
	results: IMovies[];
}

export function getMovies(pageNumber: number) {
	return fetch(
		`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${pageNumber}`
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

export function getSearchResults(query: string) {
	return fetch(
		`${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}&page=1&include_adult=false`
	).then((response) => response.json());
}
