import React from 'react';
import { Link } from 'react-router-dom';

const MovieBox = ({ list, id }) => {
	return (
		<div className='movie-box'>
			<img
				src={`https://image.tmdb.org/t/p/w200/${list && list.poster_path}`}
				alt={`${list && list.title} Poster`}
			/>
			<div className='overlay'></div>
			<Link to={`/details/${id}`} className='btnOverlay'>
				DETAILS
			</Link>
		</div>
	);
};

export default MovieBox;
