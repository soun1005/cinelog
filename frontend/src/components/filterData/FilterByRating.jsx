import { useState, useRef } from 'react';
import ReactStars from 'react-rating-stars-component';
// import { IsEmpty, Map } from 'react-lodash';

const FilterByRating = ({ setFilterStar }) => {
  const ratingHiddenMenu = useRef(null);
  const [star, setStar] = useState(5);
  const [hiddenMenu, setHiddenMenu] = useState(false);

  const ratingChanged = (newRating) => {
    setStar(newRating);
    setFilterStar(newRating);
  };

  const resetStar = () => {
    ratingChanged(5);
  };

  return (
    <div
      className={`ratingFilterWrap ${hiddenMenu ? 'active' : ''}`}
      onClick={() => setHiddenMenu(!hiddenMenu)}
    >
      <h2 className="ratingFilterTitle">Filter by Ratings</h2>
      {hiddenMenu ? (
        <div
          className="hiddenMenu"
          ref={ratingHiddenMenu}
          onClick={(e) => e.stopPropagation()}
        >
          <p>Drag to define range</p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={20}
            activeColor="#ffd700"
            key={star}
            value={star}
            classNames="ratingStars"
          />
          <button onClick={resetStar} className="ratingFilterReset">
            reset
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FilterByRating;
