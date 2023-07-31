import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/search?query=${searchTerm}`
      );
      console.log('search data', response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

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
