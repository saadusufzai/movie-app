import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
async function getSearchData(searchText) {
	const fetchSearchResult = await axios
		.get(
			`https://api.themoviedb.org/3/search/movie?api_key=531c8779023f70f5ec45da60cc337e58&language=en-US&query=${searchText}&page=1&include_adult=false`
		)
		.then((res) => {
			console.log(res.data.results);
			return res.data.results;
		});

	return fetchSearchResult;
}

const fetchSearchData = createAsyncThunk(
	'search/fetchSearchData',
	getSearchData
);

export default fetchSearchData;
