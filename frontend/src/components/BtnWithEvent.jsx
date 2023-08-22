const BtnWithEvent = ({
  text,
  className,
  disabled = false,
  onClick,
  type = 'button',
}) => {
  return (
    <button
      className={`btnStyle ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <span>{text}</span>
    </button>
  );
};

export default BtnWithEvent;
