import React from 'react';
import logo from '../assets/cineloglogo.png';
import { NavLink } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-wrap">
        <NavLink to={'/'} className="logowrap">
          <img src={logo} alt="logo" />
        </NavLink>
        {/* when user is not logged in */}
        {/* <div className="linkwrap">
          <NavLink to={'/'}>Sign in</NavLink>
          <div className="linkwrap__input">
            <input type="text" />
            <button>search</button>
          </div>
        </div> */}
        {/* when user is logged in */}
        <div className="linkwrap">
          <NavLink to={'/'}>Profile</NavLink>
          <NavLink to={'/'}>Logout</NavLink>
          <div className="linkwrap__input">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
