import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieInfo } from '../redux/features/movieInfoSlice';
import CustomBtns from '../components/CustomBtns';

const MovieInfoPage = () => {
  // to get movie id
  const { id } = useParams();
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
  // console.log(movieData);
  if (movieData.dataStatus !== 'success') {
    // need to put loader
    // this is temporary
    return null;
  }
  // the datas to display
  const { title, releasedDate, genre, poster } = movieData.movieInfo;
  const releasedYear = releasedDate.slice(0, 4);
  // console.log(releasedDate, releasedYear);

  const { movieCast, movieCrew } = movieData;
  const movieDirector = movieCrew.name;

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
              <span className="movieTitle">{title} </span>
              <span className="movieYear">({releasedYear})</span>
            </div>

            {/* movie infos */}
            <div className="main-wrap__info-subWrap subInfo">
              <span>Directed by </span>
              <span>{movieDirector}</span>
            </div>

            <div className="main-wrap__info-subWrap subInfo">
              <span>Starring </span>
              <span>
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
              <span>Genre</span>
              <span> {genre}</span>
            </div>
          </div>
          <div className="main-wrap__buttonWrap">
            <CustomBtns
              text="Review this movie"
              className="main-wrap__btn basicBtn"
              path={`/review/${id}_${title}`}
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
