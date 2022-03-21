import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMovieData,
  fetchSimilarMoviesData,
  postRatingData,
} from '../redux/movieSlice/movieThunk';

import imdbLogo from '../images/imdb.png';
import MovieBox from '../components/MovieBox';
import StarRatings from 'react-star-ratings/build/star-ratings';

const Details = () => {
  const { id } = useParams();
  const similarMovies = useSelector((state) => state.movie.similarMovies);
  const [rating, setRating] = useState(vote_average);
  const dispatch = useDispatch();
  const {
    poster_path,
    title,
    overview,
    vote_average,
    loading,
    release_date,
    tagline,
    genres,
    spoken_languages,
  } = useSelector((state) => state.movie.movieById);
  useEffect(() => {
    dispatch(fetchMovieData(id));
    dispatch(fetchSimilarMoviesData(id));
  }, [id]);
  useEffect(() => {
    // dispatching post req for rating
    dispatch(postRatingData({ id, rating }));
  }, [rating]);
  return (
    <div className='details'>
      <div className='container'>
        <div className='movieDetails'>
          <div className='poster'>
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
            />
          </div>
          <div className='topDetails'>
            <div className='top'>
              <h1>{title}</h1>
              <h5>{tagline}</h5>
              <h6>Release Date {release_date}</h6>
              <p>{overview}</p>
              <div className='genres'>
                <h3>Genres</h3>
                <ul>
                  {genres && genres.map((genre) => <li>{genre.name}</li>)}
                </ul>
              </div>
              <div className='language'>
                <h3>Language</h3>
                <ul>
                  {spoken_languages &&
                    spoken_languages.map((lang) => <li>{lang.name}</li>)}
                </ul>
              </div>
            </div>
            <div className='rateThisMovie'>
              <h3>Rate This Movie</h3>
              <StarRatings
                rating={rating}
                starDimension='18px'
                starSpacing='10px'
                starRatedColor='red'
                changeRating={(e) => setRating(e)}
                numberOfStars={10}
                name='rating'
              />
            </div>
            {}
            <div className='rating'>
              <img src={imdbLogo} alt='imdb logo' />
              <span>{vote_average}</span>
            </div>
          </div>
        </div>

        <div className='similarMovies'>
          <h1>Similar Movies</h1>
          <div className='grid'>
            {similarMovies &&
              similarMovies.results
                .slice(0, 8)
                .map((movie) => <MovieBox list={movie} id={movie.id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
