import { useQuery } from 'react-query';
import { getMovies, IGetMoviesResult } from '../api';

// Custom Hooks
export function useMovieDataStandard(
	pageNumber: number
): [IGetMoviesResult | undefined, boolean] {
	const { data, isLoading } = useQuery<IGetMoviesResult>(
		['movies', `page0${pageNumber}`],
		() => getMovies(pageNumber)
	);

	return [data, isLoading];
}

export function useMovieData(pageNumber: number) {
	const { data } = useQuery<IGetMoviesResult>(
		['movies', `page0${pageNumber}`],
		() => getMovies(pageNumber)
	);

	return data;
}
