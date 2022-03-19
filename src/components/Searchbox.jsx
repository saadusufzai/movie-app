import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import fetchSearchData from '../redux/searchSlice/searchThunk';

const Searchbox = () => {
	const [searchText, setSearchText] = useState('');
	const [searchResult, setSearchResult] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		if (searchText.length > 2) {
			dispatch(fetchSearchData(searchText));
		}
	}, [searchText]);

	return (
		<div className='searchBox'>
			<input
				className='searchBox'
				placeholder='Search'
				type='text'
				onChange={(e) => setSearchText(encodeURI(e.target.value))}
			/>
			<div className='sortButtons'>
				<span>sort</span>
				<button className=' btnSort'>A-Z</button>
				<button className=' btnSort'>Z-A</button>
			</div>
		</div>
	);
};

export default Searchbox;
