import React from 'react';
import { useSelector } from 'react-redux';
import PosterCard from '../components/PosterCard';

const SearchResult = () => {
  const searchResult = useSelector((state) => state.search.movieResults);
  const searchKeyword = useSelector((state) => state.search.searchedKeyword);

  return (
    <div className="page">
      {searchResult.length > 0 ? (
        <span className="search-result-for">
          Search results for : "{searchKeyword}"
        </span>
      ) : (
        <span className="search-result-for">
          No results for : "{searchKeyword}"
        </span>
      )}
      <PosterCard data={searchResult} />
    </div>
  );
};

export default SearchResult;
