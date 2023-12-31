import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import RatingStars from '../components/RatingStars';
import BtnWithLink from '../components/BtnWithLink';
import BtnWithEvent from '../components/BtnWithEvent';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../redux/features/reviewSlice';
import { deleteFavourite } from '../redux/features/favouriteListSlice';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import FallbackPoster from './FallbackPoster';

const ProfileList = ({
  data,
  listTitle = true,
  noDataMsg,
  dateLabel,
  pagePath,
  isReview = true,
  moreBtn = true,
  buttons = false,
  dataLength,
}) => {
  const [confirmModal, setConfirmModal] = useState(null);

  const dispatch = useDispatch();

  const cardsList = data.map((movie, index) => {
    const { createdAt, ratings, poster, _id, title, releasedDate, mediaId } =
      movie;

    const posterSrc = FallbackPoster(poster);
    const releasedYear = releasedDate ? releasedDate.slice(0, 4) : '';
    const reviewedDate = createdAt ? createdAt.slice(0, 10) : '';

    const handleDeleteReview = () => {
      // confirm modal
      dispatch(deleteReview(movie.mediaId));
      toast('Review deleted!', {
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
      dispatch(deleteFavourite(movie.mediaId));
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

    return (
      // if it's favourite list, it has one more classname for CSS
      <div
        key={_id}
        className={
          isReview
            ? 'profile-list__btn-container'
            : 'profile-list__btn-container favourite'
        }
      >
        {/* // each page's URL set to redirect to review page */}
        {isReview ? (
          <NavLink
            to={`/profile/review/${mediaId}`}
            key={createdAt}
            className="profile-list__card-wrap"
          >
            {/* poster wrap */}
            <div className="profile-list__card-wrap__poster">
              <img src={posterSrc} alt={title} />
            </div>
            {/* information wrap */}
            <div className="profile-list__card-wrap__info">
              <div className="profile-list__card-wrap__info-wrap">
                <div className="profile-list__card-wrap__info-wrap__title">
                  <span>{title} </span>
                  <span>({releasedYear})</span>
                </div>
                <div className="profile-list__card-wrap__info-wrap__reviewDate">
                  <span>{dateLabel}</span>
                  <span>{reviewedDate}</span>
                </div>
              </div>
              <div className="profile-list__card-wrap__info-wrap__ratings">
                <RatingStars rating={ratings} />
              </div>
            </div>
          </NavLink>
        ) : (
          <NavLink
            to={`/movie/${mediaId}`}
            key={createdAt}
            className="profile-list__card-wrap"
          >
            {/* poster wrap */}
            <div className="profile-list__card-wrap__poster">
              <img src={posterSrc} alt={title} />
            </div>
            {/* information wrap */}
            <div className="profile-list__card-wrap__info">
              <div className="profile-list__card-wrap__info-wrap">
                <div className="profile-list__card-wrap__info-wrap__title">
                  <span>{title} </span>
                  <span>({releasedYear})</span>
                </div>
                <div className="profile-list__card-wrap__info-wrap__reviewDate">
                  <span>{dateLabel}</span>
                  <span>{reviewedDate}</span>
                </div>
              </div>
              <div className="profile-list__card-wrap__info-wrap__ratings">
                <RatingStars rating={ratings} />
              </div>
            </div>
          </NavLink>
        )}

        {buttons && isReview && (
          <div className="profile-list__card-wrap__info-wrap__button-wrap">
            <BtnWithLink
              text="Edit"
              path={`/profile/review/edit/${mediaId}`}
              className="btnStyle basicBtn reviewBtns"
            />
            <BtnWithEvent
              text="Delete"
              className="btnStyle specialBtn reviewBtns"
              onClick={() => setConfirmModal(index)}
            />
            <ConfirmModal
              isModalOpen={confirmModal === index}
              closeModal={() => setConfirmModal(null)}
              eventFunc={handleDeleteReview}
              warningMsg="Do you really want to delete this review?"
            />
          </div>
        )}
        {buttons && !isReview && (
          <>
            <BtnWithEvent
              text="Delete"
              className="btnStyle specialBtn reviewBtns"
              onClick={() => setConfirmModal(index)}
            />
            <ConfirmModal
              isModalOpen={confirmModal === index}
              closeModal={() => setConfirmModal(null)}
              eventFunc={handleDeleteFavourite}
              warningMsg="Do you really want to remove from favourite?"
            />
          </>
        )}
      </div>
    );
  });

  return (
    <div className="profile-list__container">
      {listTitle && (
        <div className="profile-list__title-wrap">
          {/* review title and number of review */}
          <span>
            {listTitle}
            {` (${dataLength})`}
          </span>

          {data && moreBtn && (
            <NavLink to={pagePath}>
              <button className="more-btn">More</button>
            </NavLink>
          )}
        </div>
      )}

      {data.length === 0 && data.length === 0 ? (
        <p>{noDataMsg}</p>
      ) : (
        <div className="profile-list__card-container">{cardsList}</div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProfileList;
