import { NavLink } from 'react-router-dom';

const BtnWithLink = ({
  text,
  className,
  path,
  disabled = false,
  heartIcon,
  heartIconClass,
  heartAdded = true,
}) => {
  return (
    <NavLink to={path}>
      <button className={`btnStyle ${className}`} disabled={disabled}>
        {heartAdded ? (
          <div className="btn-label">
            <span className={heartIconClass}>{heartIcon}</span>
            <span> {text}</span>
          </div>
        ) : (
          <div className="btn-label">
            <span> {text}</span>
            <span className={heartIconClass}>{heartIcon}</span>
          </div>
        )}
      </button>
    </NavLink>
  );
};

export default BtnWithLink;
