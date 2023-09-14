import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import BtnWithLink from '../components/BtnWithLink';
import useMovieInfo from '../hooks/useMovieInfo';
import useToken from '../hooks/useToken';
import { loadUser } from '../redux/features/profileSlice';
import { favouriteStatus } from '../redux/features/favouriteListSlice';
import { postFavouriteList } from '../redux/features/favouriteListSlice';
import { useDispatch, useSelector } from 'react-redux';
import BtnWithEvent from '../components/BtnWithEvent';
import { deleteFavourite } from '../redux/features/favouriteListSlice';
import { reviewStatus } from '../redux/features/reviewSlice';
import { loadReviews } from '../redux/features/reviewSlice';
import { ToastContainer, toast } from 'react-toastify';

const MovieInfoPage = () => {
  const { id } = useParams();
  const movieInfo = useMovieInfo(id);
  const token = useToken();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.profile);
  const favouritedStatus = useSelector(
    (state) => state.favourite.favouriteStatus
  );
  const hasReview = useSelector((state) => state.review.reviewStatus.hasReview);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(reviewStatus({ mediaId: id, userId: userId }));
    dispatch(favouriteStatus({ mediaId: id, userId: userId }));
    dispatch(loadReviews());
  }, [dispatch, id, userId, hasReview]);

  // const favouritedList = useFavouriteList();
  // console.log('favourite from load favourite:', favouritedList);
  console.log('favourite from redux state:', favouritedStatus);

  const handleFavourite = () => {
    dispatch(postFavouriteList({ mediaId: id, userId: userId }));
    toast('Favourite added!', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const handleDeleteFavourite = () => {
    const confirmBox = window.confirm('Do you really want to delete this?');
    if (confirmBox === true) {
      dispatch(deleteFavourite(id));
      toast('Favourite deleted!', {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

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

            {token && favouritedStatus && (
              <BtnWithEvent
                heartAdded={false}
                heartIcon="favorite"
                heartIconClass="material-symbols-outlined"
                text="Remove"
                className=" main-wrap__btn specialBtn"
                onClick={handleDeleteFavourite}
              />
            )}

            {token && !favouritedStatus && (
              <BtnWithEvent
                heartAdded={false}
                text="Add"
                heartIcon="favorite"
                heartIconClass="material-symbols-outlined emptyHeart"
                className="main-wrap__btn specialBtn"
                onClick={handleFavourite}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MovieInfoPage;
