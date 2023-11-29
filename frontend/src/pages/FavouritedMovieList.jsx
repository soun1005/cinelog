import { useState } from 'react';
import ProfileList from '../components/ProfileList';
import FavouriteListService from '../api/favouriteListService';
import ListTitle from '../components/ListTitle';

const FavouritedMovieList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const {
    mergedData: favourite,
    dataLength,
    totalPages,
  } = FavouriteListService(pageNumber);

  console.log('favourite:', favourite);

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  return (
    <div className="favourite-list-page page">
      <div className="favourite-list-page__title">
        <ListTitle listTitle="Favourited movies" dataLength={dataLength} />
      </div>
      <h3 className="pagination-index">
        Page of {pageNumber + 1} / {totalPages}
      </h3>
      <ProfileList
        data={favourite}
        listTitle={false}
        noDataMsg="No favourited movies yet"
        noMatchMsg="No matched favourited movies"
        buttons={true}
        moreBtn={false}
        isReview={false}
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
