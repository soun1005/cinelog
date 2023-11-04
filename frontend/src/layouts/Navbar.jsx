import { useState, useEffect, useRef } from 'react';
import logo from '../assets/cineloglogo.png';
import { NavLink } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { logoutUser } from '../redux/features/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../redux/features/profileSlice';

const Navbar = () => {
  const [hiddenMenu, setHiddenMenu] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);
  const navHiddenMenu = useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    const handleOpenMenu = (e) => {
      // Update the state when the div loses focus
      console.log('ssibal');
      // setHiddenMenu(false);
      if (
        navHiddenMenu.current &&
        hiddenMenu &&
        !navHiddenMenu.current.contains(e.target)
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

  const { userName } = useSelector((state) => state.profile);

  if (!userName) {
    // display loader here or error
    return null;
  }

  const logIn = (
    <div className="linkwrap">
      <NavLink to={'/login'}>Log in</NavLink>
      <NavLink to={'/signup'}>Sign up</NavLink>
      <div className="linkwrap__input">
        <SearchBar />
      </div>
    </div>
  );

  const logOut = (
    <div className="linkwrap">
      <div
        className={`profileWrap ${menuAnimation ? 'active' : ''}`}
        onClick={() => setHiddenMenu(!hiddenMenu)}
      >
        {/* First nav menu is set to Username */}
        {userName}
        {hiddenMenu ? (
          <ul
            className={`hiddenMenu ${menuAnimation ? 'active' : ''}`}
            ref={navHiddenMenu}
          >
            <NavLink to={`/profile`}>Profile</NavLink>
            <NavLink to={`/profile/reviews`}>Reviews</NavLink>
            <NavLink to={`/profile/favourites`}>Favourites</NavLink>
          </ul>
        ) : (
          ''
        )}
      </div>

      <NavLink
        to={'/login'}
        onClick={() => {
          dispatch(logoutUser(null));
        }}
      >
        Logout
      </NavLink>
      <div className="linkwrap__input">
        <SearchBar />
      </div>
    </div>
  );

  return (
    <div className="navbar">
      <div className="nav-wrap">
        <NavLink to={'/'} className="logo-wrap">
          <img src={logo} alt="logo" />
        </NavLink>

        <div>{auth.token ? logOut : logIn}</div>
      </div>
    </div>
  );
};

export default Navbar;
