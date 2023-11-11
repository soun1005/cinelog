import { NavLink } from 'react-router-dom';
import fallback from '../assets/fallback_img.png';

const CastCard = ({ castInfo }) => {
  // cast info =>

  //   cast_id: 1;
  //   character: 'Carol Danvers / Captain Marvel';
  //   credit_id: '5d08fd3bc3a3687c751ef54c';
  //   id: 60073;
  //   name: 'Brie Larson';
  //   order: 0;
  //   original_name: 'Brie Larson';
  //   popularity: 121.943;
  //   profile_path: '/80DH2zWgZiXHehH7TLe6HKDldyl.jpg';

  const castPhoto = `https://image.tmdb.org/t/p/w185/${castInfo.profile_path}`;

  const posterSrc = castPhoto.includes('null') ? fallback : castPhoto;

  return (
    <div className="cast-card">
      <NavLink
        to={`/cast/${castInfo.id}`}
        className="cast-card-wrap"
        key={castInfo.key}
      >
        <div className="img__container">
          <img src={posterSrc} alt={castInfo.name} className="cast-card-img" />
        </div>
        <div className="name__container">
          <p>{castInfo.name}</p>
          <p>/{castInfo.character}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default CastCard;
