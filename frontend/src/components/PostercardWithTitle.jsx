import { NavLink } from 'react-router-dom';

const PostercardWithTitle = ({ title, date, poster, path }) => {
  return (
    <NavLink to={path} className="postercard-title__container">
      <div className="postercard-title__container-infoWrap">
        <span>{title} </span>
        <span>({date})</span>
      </div>
      <div className="postercard-title__container-posterWrap">
        <img src={poster} alt={title} />
      </div>
    </NavLink>
  );
};

export default PostercardWithTitle;
