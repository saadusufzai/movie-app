/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchSearchData from './searchThunk';

const initialState = {
	loading: true,
	searchResult: {
		results: [],
	},
};

const searchSlice = createSlice({
	name: 'Search',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchSearchData.pending]: (state) => {
			state.loading = true;
		},
		[fetchSearchData.fulfilled]: (state, action) => {
			state.searchResult = action.payload;
			state.loading = false;
		},
	},
});

export default searchSlice.reducer;
