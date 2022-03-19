import React from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
	const { id } = useParams();
	return (
		<div className='details'>
			<div className='container'>
				<div className='movieDetails'>
					<div className='poster'>
						<img src='' alt='' />
					</div>
					<div className='innerDetails'>
						<h1>Movie Title</h1>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
							dolores delectus obcaecati deserunt unde! Atque necessitatibus eum
							sequi quis ex, fugiat iusto nihil. Vel vero quos molestiae odit
							odio quasi.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
