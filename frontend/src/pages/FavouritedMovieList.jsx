import { useState, useMemo } from 'react';
import ProfileList from '../components/ProfileList';
import FavouriteListService from '../api/favouriteListService';
import Sorting from '../components/filterData/Sorting';
import ListTitle from '../components/ListTitle';
import FilterBySearchbar from '../components/filterData/FilterBySearchbar';

const FavouritedMovieList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  //sort order is passed to redux and used as endpoint
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });
  const {
    mergedData: favourite,
    totalPages,
    dataLength,
  } = FavouriteListService({
    pageNum: pageNumber,
    sortBy: sort.sort,
    sortOrder: sort.order,
    title: searchKeyword,
  });

  const isSearching = useMemo(() => searchKeyword !== '', [searchKeyword]);

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
        <Sorting setDate={setSort} />
        <FilterBySearchbar setSearch={setSearchKeyword} />
      </div>

      <ProfileList
        data={favourite}
        listTitle={false}
        noDataMsg={isSearching ? 'No matches' : 'No favourited movies yet'}
        buttons={true}
        moreBtn={false}
        isReview={false}
      />
      <div className="pagination-display">
        {pages.map((pageIndex) => (
          <button onClick={() => setPageNumber(pageIndex)} key={pageIndex}>
            {pageIndex + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavouritedMovieList;
