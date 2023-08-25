import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BtnWithLink from '../components/BtnWithLink';
import useMovieInfo from '../hooks/useMovieInfo';
import useToken from '../hooks/useToken';
import useCheckStatus from '../hooks/useCheckStatus';
import { loadUser } from '../redux/features/profileSlice';
import { favouriteStatus } from '../redux/features/createFavouriteSlice';
import { postFavouriteList } from '../redux/features/createFavouriteSlice';
import { useDispatch, useSelector } from 'react-redux';
// import useReviews from '../hooks/useReviews';
import BtnWithEvent from '../components/BtnWithEvent';

const MovieInfoPage = () => {
  const { id } = useParams();
  const movieInfo = useMovieInfo(id);
  const token = useToken();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.profile);
  const favourited = useSelector((state) => state.favourite.favouriteStatus);

  const handleFavourite = () => {
    dispatch(postFavouriteList({ mediaId: id, userId: userId }));
  };

  useEffect(() => {
    dispatch(loadUser());
    dispatch(favouriteStatus({ mediaId: id, userId: userId }));
  }, [dispatch, id, userId, favourited]);

  const hasReview = useCheckStatus('review', id, userId).hasReview;
  // console.log('hasReview?', hasReview);

  if (!movieInfo) {
    // display loader here or error
    return null;
  }

  const { title, releasedYear, genre, poster, movieCast, name } = movieInfo;

  return (
    <div className="info__container page">
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
              <span>{name}</span>
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
            {!token && (
              <BtnWithLink
                text="Login to write review"
                className="main-wrap__btn basicBtn"
                path={`/login`}
              />
            )}

            {token && !hasReview && (
              <BtnWithLink
                text="Review this movie"
                className="main-wrap__btn basicBtn"
                path={`/review/${id}_${title}`}
              />
            )}
            {token && hasReview && (
              <BtnWithLink
                text="Check my review"
                className="main-wrap__btn basicBtn"
                path={`/profile/review/${id}`}
              />
            )}
            {/* 
            {token ? (
              <BtnWithEvent
                text="+ Add to my list"
                className="main-wrap__btn specialBtn"
                onClick={handleFavourite}
              />
            ) : (
              <BtnWithLink
                text="+ Add to my list"
                className="main-wrap__btn specialBtn"
                path={'/login'}
              />
            )} */}

            {token && favourited && (
              <BtnWithEvent
                text="heart Aready added"
                className="main-wrap__btn specialBtn"
                path={'/profile'}
              />
            )}

            {token && !favourited && (
              <BtnWithEvent
                text="Add favourite"
                className="main-wrap__btn specialBtn"
                onClick={handleFavourite}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoPage;
