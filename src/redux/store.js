import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import movieSlice from './movieSlice';

const store = configureStore({
	reducer: {
		search: searchSlice,
		movie: movieSlice,
	},
});

export default store;
