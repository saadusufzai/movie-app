import React, { useState, useEffect } from 'react';
import MovieBox from '../components/MovieBox';
import axios from 'axios';
import Searchbox from '../components/Searchbox';
import { useSelector } from 'react-redux';

const Home = () => {
	const [list, setList] = useState();
	let [page, setPage] = useState(1);
	const [heading, setHeading] = useState('TRENDING MOVIES');

	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/trending/movie/week?api_key=531c8779023f70f5ec45da60cc337e58`
			)
			.then(({ data }) => setList(data.results))
			.catch((err) => console.log(err));
	}, [page]);

	let newList = useSelector((state) => state.search.searchResult);
	useEffect(() => {
		if (newList.length > 0) {
			setHeading('SEARCH RESULTS');
		}
	}, [newList]);

	return (
		<div className='home'>
			<div className='container'>
				<Searchbox />
				<h1>{heading}</h1>
				<div className='grid'>
					{newList.length > 0
						? newList &&
						  newList.map((movie) => <MovieBox id={movie.id} list={movie} />)
						: list &&
						  list.map((movie) => <MovieBox id={movie.id} list={movie} />)}
				</div>
			</div>
		</div>
	);
};

export default Home;
