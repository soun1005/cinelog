import { useState } from 'react';
import ProfileList from '../components/ProfileList';
import FavouriteListService from '../api/favouriteListService';
import SortByDate from '../components/filterData/SortByDate';
import ListTitle from '../components/ListTitle';

const FavouritedMovieList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  //sort order is passed to redux and used as endpoint
  const [sort, setSort] = useState({ sort: 'date', order: 'asc' });

  const {
    mergedData: favourite,
    dataLength,
    totalPages,
  } = FavouriteListService({
    pageNum: pageNumber,
    sortBy: sort.sort,
    sortOrder: sort.order,
  });

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  return (
    <div className="favourite-list-page page">
      <div className="favourite-list-page__title">
        <ListTitle listTitle="Favourited movies" dataLength={dataLength} />
      </div>
      <h3 className="pagination-index">
        Page of {pageNumber + 1} / {totalPages}
      </h3>

      {/* Filters */}

      <div className="filter__container">
        {/* {setRatingFilter && <FilterByRating setFilterStar={setStar} />} */}
        <SortByDate setDate={setSort} />
        {/* {setSearchFilter && <FilterBySearchbar setSearch={setSearchKeyword} />} */}
      </div>

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
