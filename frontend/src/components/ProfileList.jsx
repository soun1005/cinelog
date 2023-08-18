import { NavLink } from 'react-router-dom';
import fallback from '../assets/fallback_img.png';
import RatingStars from '../components/RatingStars';

const ProfileList = ({ data, listTitle }) => {
  const cardsList = data.map((movie) => {
    const { createdAt, ratings, poster, _id, title, releasedDate } = movie;
    const posterSrc = poster.includes('null') ? fallback : poster;

    const releasedYear = releasedDate.slice(0, 4);
    const reviewedDate = createdAt.slice(0, 10);

    return (
      // each page's URL set to redirect to review page
      <NavLink
        to={`/movie/${_id}/review`}
        key={_id}
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

            <div className="profile-list__card-wrap__info-wrap__ratings">
              <RatingStars rating={ratings} />
            </div>
          </div>
          {/* <div className="profile-list__card-wrap__info-wrap__button-wrap">
            <button>Delete</button>
            <button>Edit</button>
          </div> */}
        </div>
      </NavLink>
    );
  });

  console.log('data length', data.length);

  return (
    <div className="profile-list__container">
      <div className="profile-list__title-wrap">
        <span>{listTitle}</span> <button>More</button>
      </div>
      {data.length === 0 ? (
        <p>No {listTitle} movies yet!</p>
      ) : (
        <div className="profile-list__card-container">{cardsList}</div>
      )}
    </div>
  );
};

export default ProfileList;
