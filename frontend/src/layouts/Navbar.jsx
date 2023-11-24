import { useState, useEffect, useRef } from 'react';
import logo from '../assets/cineloglogo.png';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../redux/features/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../redux/features/profileSlice';

const Navbar = () => {
  // hidden dropdown menu for desktop version
  const [hiddenMenu, setHiddenMenu] = useState(false);
  const navHiddenMenu = useRef(null);
  const [menuAnimation, setMenuAnimation] = useState(false);

  // side nav for mobile version
  const [nav, openNav] = useState(false);
  const navSideMenu = useRef(null);
  const mobileNav = useRef();

  // redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userName } = useSelector((state) => state.profile);

  // dispatch auth slice
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, auth]);

  // handle dropdown menu
  useEffect(() => {
    const handleOpenMenu = (e) => {
      // Update the state when the div loses focus
      if (
        hiddenMenu &&
        navHiddenMenu.current &&
        !navHiddenMenu.current.contains(e.target)
      ) {
        setHiddenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOpenMenu);
    return () => {
      document.removeEventListener('click', handleOpenMenu);
    };
  }, [hiddenMenu]);

  // dropdown menu animation
  useEffect(() => {
    if (hiddenMenu) {
      setMenuAnimation(true);
    } else {
      setTimeout(() => {
        setMenuAnimation(false);
      }, 300); // Adjust this delay to match your CSS transition duration
    }
  }, [hiddenMenu]);

  // mobile nav bar closing function
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        // close nav bar while useState is true,
        // nav bar is opened,
        // nav bar doesn't contain event target
        // and event target isn't close button
        nav &&
        mobileNav.current &&
        !mobileNav.current.contains(e.target) &&
        e.target.className !== 'x-btn'
      ) {
        openNav(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // clean eventListener
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [nav]);

  const logIn = (
    <div className="link-wrap">
      <NavLink to={'/login'}>Log in</NavLink>
      <NavLink to={'/signup'}>Sign up</NavLink>
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
    </div>
  );

  const mobileLogin = (
    <div className="mobile-nav" ref={navSideMenu}>
      <NavLink to={'/login'}>Log in</NavLink>
      <NavLink to={'/signup'}>Sign up</NavLink>
    </div>
  );

  const mobileLogout = (
    <div className="mobile-nav" ref={navSideMenu}>
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

        {/* mobile version burger button */}
        <div
          className="burger-wrap"
          // whenever button is clicked -> useState reverse the value
          onClick={(e) => {
            openNav(!nav);
          }}
        >
          <div className={nav ? 'x-btn' : 'burger-btn'}></div>
        </div>
        {/* desktop nav */}
        <div>{auth.token ? logOut : logIn}</div>

        {/* mobile nav */}
        {nav && (
          <div className="mobile-nav-wrap" ref={mobileNav}>
            {auth.token ? mobileLogout : mobileLogin}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
