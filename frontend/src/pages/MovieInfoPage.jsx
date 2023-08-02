/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { movieInfo } from '../redux/features/movieInfoSlice';

const MovieInfoPage = () => {
  // to get movie id
  const { id } = useParams();
  // const idToNum = parseInt(id, 10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(movieInfo(id));
  }, []);
  // get redux state
  // 총 두개의 state -> credit, search (=state.credit, state.search)
  // state.credit.movieCast, state.credit.movieCrew
  // state.search.movieResults
  const movieData = useSelector((state) => {
    console.log('state:', state);
  });
  console.log('state:', movieData);
  // const movieData = useSelector((state) => {
  //   return state.search.movieResults;
  // });
  // console.log(creditData, movieData);

  // actor list(array), director name
  // const actorsList = creditData.movieCast;
  // const director = creditData.movieCrew[0]?.name || '';
  // const directorName = director.name;
  // console.log(director);

  // const findMovie = movieData.filter((movie) => movie.id === idToNum);
  // const pickedMovie = findMovie[0];

  // const movieTitle = pickedMovie.title;
  // const poster = pickedMovie.poster;
  // const releasedDate = pickedMovie.releasedDate;
  // console.log(poster, releasedDate, movieTitle);

  return (
    <div className="info__container">
      {/* <span>hiya this movie id is : {id}</span>
      <div className="info__wrap">
        <div className="poster-wrap">
          <img src={poster} alt={movieTitle} />
        </div>
        <div className="main-wrap">
          <div className="main-wrap__info">
            <span>
              {movieTitle} ({releasedDate})
            </span>
            <span>Directed by </span>
            <span>Starring Kilian Murphy Florence Pugh</span>
            <span>Genre Bio thriller</span>
          </div>
          <div className="main-wrap__button-wrap">two buttons here</div>
        </div>
      </div> */}
    </div>
  );
};

export default MovieInfoPage;
