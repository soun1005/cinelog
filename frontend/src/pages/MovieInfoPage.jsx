import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieInfo } from '../redux/features/movieInfoSlice';
import CustomBtns from '../components/CustomBtns';

const MovieInfoPage = () => {
  // to get movie id
  const { id } = useParams();
  // const idToNum = parseInt(id, 10);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieInfo(id));
  }, [dispatch, id]);

  // get redux state
  // 총 두개의 state -> search, info
  // 두개중, info만 사용할 것임
  // state.info.movieInfo,  state.info.movieCast,  state.info.movieCrew
  const movieData = useSelector((state) => {
    return state.info;
  });

  // the datas to display
  const movieInformation = movieData.movieInfo;
  const title = movieInformation.title;
  const releasedYear = movieInformation.releasedDate;
  const genre = movieInformation.genre;
  const poster = movieInformation.poster;
  const movieCast = movieData.movieCast;
  const movieDirector = movieData.movieCrew.name;

  return (
    <div className="info__container">
      {/* <span className="temporary"> movie id : {id}</span> */}
      <div className="info__wrap">
        <div className="poster-wrap">
          <img src={poster} alt={title} className="movieInfo-poster" />
        </div>
        <div className="main-wrap">
          <div className="main-wrap__info">
            <div className="main-wrap__info-subWrap">
              <span className="fontAccent movieTitle">{title} </span>
              <span className="fontThin">({releasedYear})</span>
            </div>
            {/* movie infos */}
            <div className="main-wrap__info-subWrap subInfo">
              <span className="fontThin">Directed by </span>
              <span className="fontAccent2">{movieDirector}</span>
            </div>
            <div className="main-wrap__info-subWrap subInfo">
              <span className="fontThin">Starring </span>
              <span className="fontAccent2">
                {movieCast.map((cast) => {
                  return (
                    <span className="movieCast" key={cast.id}>
                      {cast.name}
                    </span>
                  );
                })}
              </span>
            </div>
            <div className="main-wrap__info-subWrap subInfo">
              <span className="fontThin">Genre</span>{' '}
              <span className="fontAccent2"> {genre}</span>
            </div>
          </div>
          <div className="main-wrap__buttonWrap">
            <CustomBtns
              text="Review this movie"
              className="main-wrap__btn basicBtn"
            />
            <CustomBtns
              text="+ Add to my list"
              className="main-wrap__btn basicBtn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoPage;
