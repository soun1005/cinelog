import { NavLink } from 'react-router-dom';
import fallback from '../assets/fallback_img.png';

const ProfileList = ({ data, listTitle }) => {
  const cardsList = data.map((movie) => {
    const { poster, releasedDate, director, reviewedDate, id, title } = movie;
    const posterSrc = poster.includes('null') ? fallback : poster;

    return (
      // each page's URL set to redirect to review page
      <NavLink to={`/movie/${id}/review`} key={id} className="poster__link">
        <div className="profile-list__card-wrap-poster">
          <img src={posterSrc} alt={title} />
        </div>
        <div className="profile-list__card-wrap-title">
          <span>{title} </span>
          <span>({releasedDate})</span>
        </div>
        <div className="profile-list__card-wrap-director">
          <span>Directed by </span>
          <span>{director}</span>
        </div>
        <div className="profile-list__card-wrap-reviewDate">
          <span>Reviewed on</span>
          <span>{reviewedDate}</span>
        </div>
      </NavLink>
    );
  });

  return (
    <div className="profile-list__container">
      <span>{listTitle}</span>
      <div className="profile-list__card-wrap">{cardsList}</div>
    </div>
  );
};

export default ProfileList;
