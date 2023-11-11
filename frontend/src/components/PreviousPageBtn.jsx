import { useNavigate } from 'react-router-dom';
import leftArrow from '../assets/left-arrow.png';

const PreviousPageBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="back-btn__wrap">
      <img
        src={leftArrow}
        alt="go back"
        className="back-btn"
        onClick={() => navigate(-1)}
      />
    </div>
  );
};

export default PreviousPageBtn;
