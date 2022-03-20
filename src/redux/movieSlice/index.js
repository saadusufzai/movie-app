/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
	fetchMovieData,
	fetchSimilarMoviesData,
	fetchTopRatedMovieData,
	fetchTrendingMovieData,
	postRatingData,
} from './movieThunk';

const initialState = {
	trendingMovies: {
		loading: true,
		results: [],
	},
	movieById: {
		loading: true,
	},
	similarMovies: {
		loading: true,
		results: [],
	},
	rating: {
		sending: false,
	},
	topRatedMovies: {
		loading: true,
		results: [],
	},
};

const movieSlice = createSlice({
	name: 'Moive',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchMovieData.pending]: (state) => {
			state.loading = true;
		},
		[fetchMovieData.fulfilled]: (state, action) => {
			state.movieById = action.payload;
			state.movieById.loading = false;
		},

		[fetchTrendingMovieData.pending]: (state) => {
			state.loading = true;
		},
		[fetchTrendingMovieData.fulfilled]: (state, action) => {
			state.trendingMovies.results = action.payload;
			state.trendingMovies.loading = false;
		},
		[fetchSimilarMoviesData.pending]: (state) => {
			state.loading = true;
		},
		[fetchSimilarMoviesData.fulfilled]: (state, action) => {
			state.similarMovies.results = action.payload;
			state.similarMovies.loading = false;
		},
		[fetchTopRatedMovieData.pending]: (state) => {
			state.loading = true;
		},
		[fetchTopRatedMovieData.fulfilled]: (state, action) => {
			state.topRatedMovies.results = action.payload;
			state.topRatedMovies.loading = false;
		},
		[postRatingData.pending]: (state) => {
			state.rating.sending = true;
		},
		[postRatingData.fulfilled]: (state, action) => {
			state.rating = action.payload;
			state.rating.sending = false;
		},
	},
});

export default movieSlice.reducer;
