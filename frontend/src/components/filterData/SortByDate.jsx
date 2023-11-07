import { useState, useRef, useEffect } from 'react';

const SortByDate = ({ setDate }) => {
  const [sort, setSort] = useState('Sort by');
  const [hiddenMenu, setHiddenMenu] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);

  const sortOptions = useRef(null);
  const handleOnClick = (e) => {
    setSort(e.target.innerText);
    setDate(e.target.innerText);
  };

  console.log(sort);

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
      }, 300); // Adjust this delay to match your CSS transition duration
    }
  }, [hiddenMenu]);

  return (
    <div
      className={`filterWrap ${menuAnimation ? 'active' : ''}`}
      onClick={() => setHiddenMenu(!hiddenMenu)}
    >
      <h2 className="filterTitle">{sort}</h2>
      {hiddenMenu ? (
        <div
          className={`hiddenMenu ${menuAnimation ? 'active' : ''}`}
          ref={sortOptions}
        >
          <button onClick={handleOnClick}>Added date ▽ </button>
          <button onClick={handleOnClick}>Added date △</button>
          <button onClick={handleOnClick}>Released date ▽</button>
          <button onClick={handleOnClick}>Released date △</button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SortByDate;
