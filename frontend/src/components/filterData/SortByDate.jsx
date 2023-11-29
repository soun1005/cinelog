import { useState, useRef, useEffect } from 'react';

const SortByDate = ({ setDate, ratings = false }) => {
  const [sort, setSort] = useState({ sort: 'date', order: 'asc' });
  const [hiddenMenu, setHiddenMenu] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);

  const sortOptions = useRef(null);

  const handleOnClick = (sortStr, order) => {
    const sorting = { sort: sortStr, order };
    setSort(sorting);
    setDate(sorting);
  };

  useEffect(() => {
    const handleOpenMenu = (e) => {
      // Update the state when the div loses focus
      if (
        sortOptions.current &&
        hiddenMenu &&
        !sortOptions.current.contains(e.target)
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
      }, 500);
    }
  }, [hiddenMenu]);

  return (
    <div
      className={`filter-wrap ${menuAnimation ? 'active' : ''}`}
      onClick={() => setHiddenMenu(!hiddenMenu)}
    >
      <span>Sort by :&nbsp; </span>
      <h2 className="filter-wrap__title">
        {sort.sort} ({sort.order})
      </h2>
      {hiddenMenu ? (
        <div
          className={`hidden-menu ${menuAnimation ? 'active' : ''}`}
          ref={sortOptions}
        >
          <button onClick={() => handleOnClick('date', 'asc')}>
            Added date (asc){' '}
          </button>
          <button onClick={() => handleOnClick('date', 'desc')}>
            Added date (desc){' '}
          </button>
          {ratings && (
            <>
              <button onClick={() => handleOnClick('ratings', 'asc')}>
                Ratings (asc){' '}
              </button>
              <button onClick={() => handleOnClick('ratings', 'desc')}>
                Ratings (desc){' '}
              </button>
            </>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SortByDate;
