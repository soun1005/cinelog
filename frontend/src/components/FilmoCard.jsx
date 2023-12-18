import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import FallbackPoster from './FallbackPoster';

const FilmoCard = ({ poster, title, date, path, character }) => {
  const formattedDate = dayjs(date).format('DD/MM/YYYY');
  const posterSrc = FallbackPoster(poster);

  return (
    <NavLink to={path} className="filmocard__container">
      <div className="filmocard__container__poster-wrap">
        <img src={posterSrc} alt={title} />
      </div>
      <div className="filmocard-info-wrap">
        <div className="filmocard-info-wrap__title">
          <span>{title} </span>
          <span>({formattedDate})</span>
        </div>
        <div className="filmocard-info-wrap__credit">
          <span>Credit: </span>
          <span>{character}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default FilmoCard;
