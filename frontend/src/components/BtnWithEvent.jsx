const BtnWithEvent = ({ text, className, disabled = false, onClick }) => {
  return (
    <button
      className={`btnStyle ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};

export default BtnWithEvent;
