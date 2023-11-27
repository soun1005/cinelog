import { useState } from 'react';
import ProfileList from '../components/ProfileList';
import FavouriteListService from '../api/favouriteListService';

const FavouritedMovieList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const {
    mergedData: favourite,
    dataLength,
    totalPages,
  } = FavouriteListService(pageNumber);

  if (!favourite || !dataLength || !totalPages) {
    // display loader here or error
    return null;
  }

  console.log('favourite:', favourite);

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  return (
    <div className="favourite-list-page page">
      <h3 className="pagination-index">
        Page of {pageNumber + 1} / {totalPages}
      </h3>
      <ProfileList
        data={favourite}
        listTitle="My favourites"
        noDataMsg="No favourited movies yet"
        noMatchMsg="No matched favourited movies"
        buttons={true}
        moreBtn={false}
        isReview={false}
        dataLength={dataLength}
        setSearchFilter={true}
        setSortFilter={true}
      />
      <div className="pagination-display">
        {pages.map((pageIndex) => (
          <button onClick={() => setPageNumber(pageIndex)}>
            {pageIndex + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavouritedMovieList;
