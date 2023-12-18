import { NavLink } from 'react-router-dom';
import FallbackPoster from './FallbackPoster';

const CastCard = ({ castInfo }) => {
  const { id, key, name, character, profile_path } = castInfo;

  const castPhoto = `https://image.tmdb.org/t/p/w185/${profile_path}`;
  const posterSrc = FallbackPoster(castPhoto);

  return (
    <div className="cast-card">
      <NavLink to={`/cast/${id}`} className="cast-card-wrap" key={key}>
        <div className="img__container">
          <img src={posterSrc} alt={name} className="cast-card-img" />
        </div>
        <div className="name__container">
          <p>{name}</p>
          {character !== '' && <p> / {character}</p>}
        </div>
      </NavLink>
    </div>
  );
};

export default CastCard;
