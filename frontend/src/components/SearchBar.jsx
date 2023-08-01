import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import axios from 'axios';
// import { useDispatch, useSelector } from '@reduxjs/toolkit';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { moviesSearch } from '../redux/features/movieResultSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // initialise dispatch
  const dispatch = useDispatch();
  // const storedData = useSelector((state) => state.search.movieResults);

  const handleSearch = () => {
    dispatch(moviesSearch(searchTerm));
    setSearchTerm('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.target.value);
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="search__wrap">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search__input"
        placeholder="search"
      />
      <NavLink to={'search'} className="search__btnWrap">
        <button className="search__btn" onClick={handleSearch}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </NavLink>
    </div>
  );
};

export default SearchBar;
