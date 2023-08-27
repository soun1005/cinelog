import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import BtnWithLink from '../components/BtnWithLink';
import useMovieInfo from '../hooks/useMovieInfo';
import useToken from '../hooks/useToken';
import useCheckStatus from '../hooks/useCheckStatus';
import { loadUser } from '../redux/features/profileSlice';
import { favouriteStatus } from '../redux/features/favouriteListSlice';
import { postFavouriteList } from '../redux/features/favouriteListSlice';
import { useDispatch, useSelector } from 'react-redux';
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

  const {
    title,
    releasedYear,
    genre,
    poster,
    movieCast,
    name,
    overview,
    releasedDate,
  } = movieInfo;

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
            {/* director */}
            <div className="main-wrap__info-subWrap subInfo">
              <NavLink to={'/'}>
                <span>Directed by </span>
                <span className="director">{name}</span>
              </NavLink>
            </div>

            {/* cast */}
            <div className="main-wrap__info-subWrap subInfo">
              <span>Starring </span>
              <span>
                {movieCast.map((cast) => {
                  return (
                    <NavLink to={'/'}>
                      <span className="movieCast" key={cast.id}>
                        {cast.name}
                      </span>
                    </NavLink>
                  );
                })}
              </span>
            </div>

            {/* genre */}
            <div className="main-wrap__info-subWrap subInfo">
              <span>Genre</span>
              <span> {genre}</span>
            </div>

            {/* releasedDate */}
            <div className="main-wrap__info-subWrap subInfo">
              <span>Released Date</span>
              <span> {releasedDate}</span>
            </div>

            {/* overview */}
            <div className="main-wrap__info-subWrap subInfo info-overview">
              <span>Overview</span>
              <span> {overview}</span>
            </div>
          </div>
          <div className="main-wrap__buttonWrap">
            {!token && (
              <div className="main-wrap__buttonWrap">
                <BtnWithLink
                  text="Review this movie"
                  className="main-wrap__btn basicBtn"
                  path={`/login`}
                />
                <BtnWithLink
                  className="main-wrap__btn specialBtn"
                  text="Add"
                  heartIcon="favorite"
                  heartIconClass="material-symbols-outlined"
                  path={`/login`}
                />
              </div>
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

            {token && favourited && (
              <BtnWithLink
                heartIcon="favorite"
                heartIconClass="material-symbols-outlined"
                text="added"
                className=" main-wrap__btn specialBtn"
                path={'/profile/favourites'}
              />
            )}

            {token && !favourited && (
              <BtnWithEvent
                heartAdded={false}
                text="Add"
                heartIcon="favorite"
                heartIconClass="material-symbols-outlined"
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
