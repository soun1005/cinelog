import React from 'react';
import logo from '../assets/cineloglogo.png';
import { NavLink } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { logoutUser } from '../redux/features/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log(auth);

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
      <NavLink to={'/'}>Profile</NavLink>
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
        <NavLink to={'/'} className="logowrap">
          <img src={logo} alt="logo" />
        </NavLink>

        <div>{auth.token ? logOut : logIn}</div>
      </div>
    </div>
  );
};

export default Navbar;
