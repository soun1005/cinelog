import { useState } from 'react';
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
    dataLength,
    totalPages,
  } = FavouriteListService({
    pageNum: pageNumber,
    sortBy: sort.sort,
    sortOrder: sort.order,
  });

  const filteredData =
    searchKeyword !== ''
      ? favourite.filter((item) =>
          item.title.toLowerCase().includes(searchKeyword)
        )
      : favourite;

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
        data={filteredData}
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
