import React, { useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { moviesSearch } from '../redux/features/movieResultSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // initialise dispatch
  const dispatch = useDispatch();
  const storedData = useSelector((state) => state.search.movieResults);

  const handleSearch = () => {
    dispatch(moviesSearch(searchTerm));
  };
  console.log('stored data:', storedData);
  return (
    <div className="search__wrap">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search__input"
        placeholder="search"
      />
      <button className="search__btn" onClick={handleSearch}>
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
};

export default SearchBar;
