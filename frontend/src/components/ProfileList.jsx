import { NavLink } from 'react-router-dom';
import fallback from '../assets/fallback_img.png';
// import useMovieInfo from '../hooks/useMovieInfo';

const ProfileList = ({ data, listTitle }) => {
  const cardsList = data.map((movie) => {
    const { createdAt, ratings, poster, _id, title, releasedDate } = movie;
    const posterSrc = poster.includes('null') ? fallback : poster;

    // React Hook "useMovieInfo" cannot be called inside a callback?
    // const movieInfo = useMovieInfo(mediaId);

    return (
      // each page's URL set to redirect to review page
      <NavLink to={`/movie/${_id}/review`} key={_id} className="poster__link">
        {
          <div className="profile-list__card-wrap-poster">
            <img src={posterSrc} alt={title} />
          </div>
        }
        {
          <div className="profile-list__card-wrap-title">
            <span>{title} </span>
            <span>({releasedDate})</span>
          </div>
        }

        <div className="profile-list__card-wrap-reviewDate">
          <span>Reviewed on</span>
          <span>{createdAt}</span>
        </div>
        <div className="profile-list__card-wrap-ratings">{ratings}</div>
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
