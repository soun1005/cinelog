// this hook helps to retrieve the states of multiple redux slice
// pass movie id as param and get all data I need from the movie

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieInfo } from '../redux/features/movieInfoSlice';

const useMovieInfo = (movieId) => {
  // to get movie id
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieInfo(movieId));
  }, [dispatch, movieId]);

  // saved movie datas from redux by 'dispatch movieInfo'
  const movieData = useSelector((state) => {
    // console.log('state:', state);
    return state.info;
  });

  if (movieData.dataStatus !== 'success') {
    return null;
  }

  //   2 main actors
  const { movieCast } = movieData;

  //   director name
  const { name } = movieData.movieCrew;

  //   general movie info
  const { genre, id, overview, poster, releasedDate, title } =
    movieData.movieInfo;

  // extract only year from a date
  const releasedYear = releasedDate.slice(0, 4);

  return {
    id,
    overview,
    title,
    releasedYear,
    genre,
    poster,
    movieCast,
    name,
  };
};

export default useMovieInfo;
