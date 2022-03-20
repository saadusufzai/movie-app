import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

async function getMovieData(movie_id) {
	const fetchMovieResult = await axios

		.get(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=531c8779023f70f5ec45da60cc337e58&language=en-US`
		)
		.then(({ data }) => {
			console.log('Movie Data', data);
			return data;
		})
		.catch((err) => console.error(err));

	return fetchMovieResult;
}

async function getTrendingMovies(vote, page) {
	const fetchTrendingMovieResult = await axios
		.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=531c8779023f70f5ec45da60cc337e58&language=en-US&sort_by=vote_average.${vote}&include_adult=false&include_video=false&page=${page}`
		)
		.then(({ data }) => data.results)
		.catch((err) => console.err(err));

	return fetchTrendingMovieResult;
}

async function getSimilarMovies(movie_id, page = 1) {
	const fetchSimilarMovies = await axios
		.get(
			`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=531c8779023f70f5ec45da60cc337e58&language=en-US&page=1`
		)
		.then(({ data }) => data.results)
		.catch((err) => console.err(err));

	return fetchSimilarMovies;
}

async function postUserRatings(payload) {
	console.log('guestIDs11', payload);

	const postRating = await axios
		.get(
			'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=531c8779023f70f5ec45da60cc337e58'
		)
		.then(({ data }) => {
			console.log('guestID', data.guest_session_id);
			return data.guest_session_id;
		})
		.then((res) => {
			axios
				.post(
					`https://api.themoviedb.org/3/movie/${payload.id}/rating?api_key=531c8779023f70f5ec45da60cc337e58&guest_session_id=${res}`,
					{
						value: payload.rating,
					}
				)
				.then((res) => res)
				.catch((err) => console.error(err));
		})
		.catch((err) => console.error(err));

	return postRating;
}

async function getTopRatedMovies() {
	const fetchTopRated = await axios

		.get(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=531c8779023f70f5ec45da60cc337e58&language=en-US&page=1`
		)
		.then(({ data }) => {
			return data.results;
		})
		.catch((err) => console.error(err));

	return fetchTopRated;
}

const postRatingData = createAsyncThunk(
	'movie/postRatingData',
	postUserRatings
);

const fetchTopRatedMovieData = createAsyncThunk(
	'movie/fetchTopRatedMovieData',
	getTopRatedMovies
);
const fetchMovieData = createAsyncThunk('movie/fetchMovieData', getMovieData);
const fetchTrendingMovieData = createAsyncThunk(
	'movie/fetchTrendingMovieData',
	getTrendingMovies
);

const fetchSimilarMoviesData = createAsyncThunk(
	'movie/fetchSimilarMovies',
	getSimilarMovies
);

export {
	fetchMovieData,
	fetchTrendingMovieData,
	fetchSimilarMoviesData,
	postRatingData,
	fetchTopRatedMovieData,
};
