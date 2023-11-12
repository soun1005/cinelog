import { NavLink } from 'react-router-dom';

const FilmoCard = ({ poster, title, date, path, character }) => {
  return (
    <NavLink to={path} className="filmocard__container">
      <div className="filmocard__container__poster-wrap">
        <img src={poster} alt={title} />
      </div>
      <div className="filmocard-info-wrap">
        <div className="filmocard-info-wrap__title">
          <span>{title} </span>
          <span>({date})</span>
        </div>
        <div className="filmocard-info-wrap__credit">
          <span>Credit:</span>
          <span>{character}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default FilmoCard;
