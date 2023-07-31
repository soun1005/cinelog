import React from 'react';
import { useSelector } from 'react-redux';
import PosterCard from '../components/PosterCard';

const SearchResult = () => {
  const searchResult = useSelector((state) => state.search.movieResults);
  const searchKeyword = useSelector((state) => state.search.searchedKeyword);
  //   console.log(searchResult);

  return (
    <div>
      {searchResult.length > 0 && (
        <span className="searchResultFor">
          Search results for : "{searchKeyword}"
        </span>
      )}
      <PosterCard data={searchResult} />
    </div>
  );
};

export default SearchResult;
