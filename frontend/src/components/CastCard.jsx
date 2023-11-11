import { NavLink } from 'react-router-dom';

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

  return (
    <div className="castCardWrap">
      <NavLink
        to={`/cast/${castInfo.id}`}
        className="castCardWrap"
        key={castInfo.key}
      >
        <img src={castPhoto} alt={castInfo.name} className="castCardImg" />
        <p>{castInfo.name}</p>
        <p>/{castInfo.character}</p>
      </NavLink>
    </div>
  );
};

export default CastCard;
