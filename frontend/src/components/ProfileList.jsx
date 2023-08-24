import { NavLink } from 'react-router-dom';
import fallback from '../assets/fallback_img.png';
import RatingStars from '../components/RatingStars';
import BtnWithLink from '../components/BtnWithLink';
import BtnWithEvent from '../components/BtnWithEvent';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../redux/features/profileSlice';

const ProfileList = ({
  data,
  listTitle,
  noDataMsg,
  moreBtn = true,
  buttons = false,
}) => {
  const dispatch = useDispatch();
  // console.log(data);
  const cardsList = data.map((movie) => {
    const { createdAt, ratings, poster, _id, title, releasedDate, mediaId } =
      movie;
    const posterSrc = poster.includes('null') ? fallback : poster;

    const releasedYear = releasedDate.slice(0, 4);
    const reviewedDate = createdAt.slice(0, 10);

    const handleClick = () => {
      console.log('deleted');
      dispatch(deleteReview(movie.mediaId));
    };

    return (
      <div key={_id} className="profile-list__btn-container">
        {/* // each page's URL set to redirect to review page */}
        <NavLink
          to={`/profile/review/${mediaId}`}
          // key={_id}
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
                <span>Reviewed on</span>
                <span>{reviewedDate}</span>
              </div>
            </div>
            <div className="profile-list__card-wrap__info-wrap__ratings">
              <RatingStars rating={ratings} />
            </div>
          </div>
        </NavLink>
        {buttons ? (
          <div className="profile-list__card-wrap__info-wrap__button-wrap">
            <BtnWithLink
              text="Edit"
              path={'/review/edit'}
              className="btnStyle basicBtn reviewBtns"
            />
            <BtnWithEvent
              text="Delete"
              className="btnStyle specialBtn reviewBtns"
              onClick={handleClick}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  });

  return (
    <div className="profile-list__container">
      <div className="profile-list__title-wrap">
        <span>{listTitle}</span>
        {data && moreBtn && (
          <NavLink to={'/profile/reviews'}>
            <button>More</button>
          </NavLink>
        )}
      </div>
      {data.length === 0 ? (
        <p>{noDataMsg}</p>
      ) : (
        <div className="profile-list__card-container">{cardsList}</div>
      )}
    </div>
  );
};

export default ProfileList;
