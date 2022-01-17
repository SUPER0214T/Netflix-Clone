const API_KEY = 'd71e59939752809aacb08c573188d676';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovies {
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

export function getMovies() {
	return fetch(
		`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
	).then((response) => response.json());
}
