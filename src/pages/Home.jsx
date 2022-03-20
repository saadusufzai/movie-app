import React, { useState, useEffect } from 'react';
import MovieBox from '../components/MovieBox';
import Searchbox from '../components/Searchbox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingMovieData } from '../redux/movieSlice/movieThunk';

const Home = () => {
	const [heading, setHeading] = useState('DISCOVER MOVIES');
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState('desc');
	const dispatch = useDispatch();
	const list = useSelector((state) => state.movie.trendingMovies.results);

	useEffect(() => {
		dispatch(fetchTrendingMovieData(sort, page));
		// console.log(lists);
		// setList(lists);
	}, [page, sort]);

	let newList = useSelector((state) => state.search.searchResult);
	useEffect(() => {
		if (newList.length > 0) {
			setHeading('SEARCH RESULTS');
		}
	}, [newList]);

	return (
		<div className='home'>
			<div className='container'>
				<Searchbox setSort={setSort} />
				<h1>{heading}</h1>
				<div className='grid'>
					{newList.length > 0
						? newList &&
						  newList
								.filter((e) => e.poster_path != null)
								.map((movie) => <MovieBox id={movie.id} list={movie} />)
						: list &&
						  list
								.filter((e) => e.poster_path != null)
								.map((movie) => <MovieBox id={movie.id} list={movie} />)}
				</div>
			</div>
		</div>
	);
};

export default Home;
