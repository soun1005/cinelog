// this hook helps to retrieve the states of multiple redux slice
// pass movie id as param and get all data I need from the movie
import dayjs from 'dayjs';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieInfo } from '../redux/features/movieInfoSlice';

const MovieInfoService = (movieId) => {
  // to get movie id
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieInfo(movieId));
  }, [dispatch, movieId]);

  // saved movie datas from redux by 'dispatch movieInfo'
  const movieData = useSelector((state) => {
    return state.info;
  });

  if (movieData.dataStatus !== 'success') {
    return null;
  }

  //   3 main actors
  const { movieCast } = movieData;

  //   director name
  const { movieCrew } = movieData;

  const { allCasts } = movieData;

  //   general movie info
  const { genre, id, overview, poster, releasedDate, title } =
    movieData.movieInfo;

  // extract only year from a date
  const releasedYear = releasedDate.slice(0, 4);

  const formattedDate = dayjs(releasedDate).format('DD/MM/YYYY');

  return {
    id,
    overview,
    title,
    releasedYear,
    releasedDate: formattedDate,
    genre,
    poster,
    movieCast,
    movieCrew,
    allCasts,
  };
};

export default MovieInfoService;
