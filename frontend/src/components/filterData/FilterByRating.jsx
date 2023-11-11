import { useState, useRef, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';

const FilterByRating = ({ setFilterStar }) => {
  const ratingHiddenMenu = useRef(null);
  const [star, setStar] = useState(5);
  const [hiddenMenu, setHiddenMenu] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);

  const ratingChanged = (newRating) => {
    setStar(newRating);
    setFilterStar(newRating);
  };

  const resetStar = () => {
    ratingChanged(5);
  };

  useEffect(() => {
    const handleOpenMenu = (e) => {
      // Update the state when the div loses focus
      if (
        ratingHiddenMenu.current &&
        hiddenMenu &&
        !ratingHiddenMenu.current.contains(e.target)
      ) {
        setHiddenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOpenMenu);
  }, [hiddenMenu]);

  useEffect(() => {
    if (hiddenMenu) {
      setMenuAnimation(true);
    } else {
      setTimeout(() => {
        setMenuAnimation(false);
      }, 300); // Adjust this delay to match your CSS transition duration
    }
  }, [hiddenMenu]);

  return (
    <div
      className={`filterWrap ${menuAnimation ? 'active' : ''}`}
      onClick={() => setHiddenMenu(!hiddenMenu)}
    >
      <h2 className="filterTitle">Filter by Ratings</h2>
      {hiddenMenu ? (
        <div
          className={`hiddenMenu ${menuAnimation ? 'active' : ''}`}
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
