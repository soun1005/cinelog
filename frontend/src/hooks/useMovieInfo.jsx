// this hook helps to retrieve the states of multiple redux slice
// pass movie id as param and get all data I need from the movie

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieInfo } from '../redux/features/movieInfoSlice';

const useMovieInfo = (movieId) => {
  const [data, setData] = useState(null);
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
    // need to put loader
    // this is temporary
    return null;
  }

  // first slice
  const { title, releasedDate, genre, poster } = movieData.movieInfo;
  const releasedYear = releasedDate.slice(0, 4);

  //   second slice
  const { movieCast, movieCrew } = movieData;
  const movieDirector = movieCrew.name;

  setData({ title, releasedYear, genre, poster, movieCast, movieDirector });

  return { data };
};

export default useMovieInfo;
