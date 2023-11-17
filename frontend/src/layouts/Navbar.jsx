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
  const [nav, openNav] = useState(false);
  const navHiddenMenu = useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userName } = useSelector((state) => state.profile);

  console.log(nav);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, auth]);

  useEffect(() => {
    const handleOpenMenu = (e) => {
      // Update the state when the div loses focus
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

  const logIn = (
    <div className="link-wrap">
      <NavLink to={'/login'}>Log in</NavLink>
      <NavLink to={'/signup'}>Sign up</NavLink>
      <div className="link-wrap__input">
        <SearchBar />
      </div>
    </div>
  );

  const logOut = (
    <div className="link-wrap">
      <div
        className={`profile-wrap ${menuAnimation ? 'active' : ''}`}
        onClick={() => setHiddenMenu(!hiddenMenu)}
      >
        {/* First nav menu is set to Username */}
        {userName}
        {hiddenMenu ? (
          <ul
            className={`hidden-menu ${menuAnimation ? 'active' : ''}`}
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
      <div className="link-wrap__input">
        <SearchBar />
      </div>
    </div>
  );

  const mobileLogin = (
    <div className="mobile-nav">
      <NavLink to={'/login'}>Log in</NavLink>
      <NavLink to={'/signup'}>Sign up</NavLink>
    </div>
  );

  const mobileLogout = (
    <div className="mobile-nav">
      <NavLink to={`/profile`}> {userName}</NavLink>
      <NavLink to={`/profile/reviews`}>Reviews</NavLink>
      <NavLink to={`/profile/favourites`}>Favourites</NavLink>
      <NavLink
        to={'/login'}
        onClick={() => {
          dispatch(logoutUser(null));
        }}
      >
        Logout
      </NavLink>
    </div>
  );

  return (
    <div className="navbar">
      <div className="nav-wrap">
        <NavLink to={'/'} className="logo-wrap">
          <img src={logo} alt="logo" />
        </NavLink>
        <div className="link-wrap__input mobile-ver">
          <SearchBar />
        </div>
        {/* responsive nav */}
        <div
          className="open-icon"
          onClick={() => {
            openNav(!nav);
          }}
        >
          <div className={nav ? 'side-nav' : 'open'}></div>
        </div>
        <div>{auth.token ? logOut : logIn}</div>
        {nav && (
          <div className="mobile-nav-wrap">
            {auth.token ? mobileLogout : mobileLogin}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
