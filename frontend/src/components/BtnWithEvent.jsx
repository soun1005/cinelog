const BtnWithEvent = ({
  text,
  className,
  disabled = false,
  onClick,
  heartIcon,
  heartIconClass,
  heartAdded = true,
  type = 'button',
}) => {
  return (
    <button
      className={`btnStyle ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
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
  );
};

export default BtnWithEvent;
