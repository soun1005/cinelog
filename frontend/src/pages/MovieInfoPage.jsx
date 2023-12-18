import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

// components
import BtnWithLink from '../components/BtnWithLink';
import BtnWithEvent from '../components/BtnWithEvent';
import Loading from '../components/Loading';
import ConfirmModal from '../components/ConfirmModal';
import FallbackPoster from '../components/FallbackPoster';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavourite } from '../redux/features/favouriteListSlice';
import { reviewStatus } from '../redux/features/reviewSlice';
import { loadReviews } from '../redux/features/reviewSlice';
import { loadUser } from '../redux/features/profileSlice';
import { favouriteStatus } from '../redux/features/favouriteListSlice';
import { postFavouriteList } from '../redux/features/favouriteListSlice';

// API
import MovieInfoService from '../api/movieInfoService';
import TokenService from '../api/tokenService';

// toast
import { ToastContainer, toast } from 'react-toastify';
import CastSection from '../components/CastSection';

const MovieInfoPage = () => {
  // to open and close confirm modal
  const [confirmModal, setConfirmModal] = useState(false);

  const { id } = useParams();
  const movieInfo = MovieInfoService(id);

  const token = TokenService();
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.profile);
  const movieStatus = useSelector((state) => state.info.dataStatus);
  const movieLoaded = !!movieStatus;

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

  // button to delete favourite
  const handleDeleteFavourite = () => {
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
    movieCrew,
    overview,
    releasedDate,
    allCasts,
  } = movieInfo;

  console.log(movieCast);
  console.log('movieCrew', movieCrew);

  const posterSrc = FallbackPoster(poster);

  // button to add favourite
  const handleFavourite = () => {
    dispatch(postFavouriteList({ mediaId: id, userId, title }));
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

  const movieCastTop6 = allCasts.slice(0, 6);

  return (
    <div className="info__container page">
      {!movieLoaded ? <Loading /> : ''}
      <div className="info-wrap">
        <div className="poster-wrap">
          <img src={posterSrc} alt={title} className="movie-info-poster" />
        </div>
        <div className="main-wrap">
          <div className="main-wrap__info">
            <div className="main-wrap__info-sub-wrap">
              <span className="movie-title">{title} </span>
              <span className="movie-year">({releasedYear})</span>
            </div>

            {/* movie infos */}
            {/* director */}
            <div className="main-wrap__info-sub-wrap sub-info">
              {movieCrew !== undefined && (
                <NavLink to={`/cast/${movieCrew.id}`}>
                  <span>Directed by </span>
                  <span className="director">{movieCrew.name}</span>
                </NavLink>
              )}
            </div>

            {/* cast */}
            <div className="main-wrap__info-sub-wrap sub-info">
              <span>Starring </span>
              <span>
                {movieCast.map((cast) => {
                  // return only when cast is not null
                  return cast !== null ? (
                    <NavLink to={`/cast/${cast.id}`} key={cast.id}>
                      <span className="movie-cast" key={cast.id}>
                        {cast.name}
                      </span>
                    </NavLink>
                  ) : null;
                })}
              </span>
            </div>

            {/* genre */}
            <div className="main-wrap__info-su-wrap sub-info">
              <span>Genre</span>
              <span> {genre}</span>
            </div>

            {/* releasedDate */}
            <div className="main-wrap__info-sub-wrap sub-info">
              <span>Released Date</span>
              <span> {releasedDate}</span>
            </div>

            {/* overview */}
            <div className="main-wrap__info-sub-wrap sub-info info-overview">
              <span>Overview</span>
              <span> {overview}</span>
            </div>
          </div>
          <div className="main-wrap__button-wrap">
            {!token && (
              <div className="main-wrap__button-wrap">
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
              <>
                <BtnWithEvent
                  heartAdded={false}
                  heartIcon="favorite"
                  heartIconClass="material-symbols-outlined"
                  text="Remove"
                  className=" main-wrap__btn specialBtn"
                  onClick={() => setConfirmModal(true)}
                />
                <ConfirmModal
                  isModalOpen={confirmModal}
                  closeModal={() => setConfirmModal(false)}
                  eventFunc={handleDeleteFavourite}
                  warningMsg="Do you really want to remove from favourite?"
                />
              </>
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

      {/************ casts ***********/}
      <CastSection lessCast={movieCastTop6} moreCast={allCasts} />
      <ToastContainer />
    </div>
  );
};

export default MovieInfoPage;
