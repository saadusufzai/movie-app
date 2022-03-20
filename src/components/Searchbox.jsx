import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import fetchSearchData from '../redux/searchSlice/searchThunk';

const Searchbox = ({ setSort }) => {
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
				<p>sort by rating</p>
				<button onClick={() => setSort('aesc')} className=' btnSort'>
					0-10
				</button>
				<button onClick={() => setSort('desc')} className=' btnSort'>
					10-0
				</button>
			</div>
		</div>
	);
};

export default Searchbox;
