import { useState } from 'react';
import ReviewService from '../api/reviewService';
import ProfileList from '../components/ProfileList';
import Sorting from '../components/filterData/Sorting';
import ListTitle from '../components/ListTitle';
import FilterBySearchbar from '../components/filterData/FilterBySearchbar';

const ReviewedMovieList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  //sort order is passed to redux and used as endpoint
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });

  const {
    mergedData: data,
    totalPages,
    dataLength,
  } = ReviewService({
    pageNum: pageNumber,
    sortBy: sort.sort,
    sortOrder: sort.order,
    title: searchKeyword,
  });

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  return (
    <div className="review-list-page page">
      <div className="review-list-page__title">
        <ListTitle listTitle="Reviews" dataLength={dataLength} />
      </div>
      {pageNumber !== 0 && (
        <h3 className="pagination-index">
          Page of {pageNumber + 1} / {totalPages}
        </h3>
      )}

      {/* Filters */}

      <div className="filter__container">
        <Sorting setDate={setSort} ratings={true} />
        <FilterBySearchbar setSearch={setSearchKeyword} />
      </div>

      <ProfileList
        data={data}
        listTitle={false}
        noDataMsg={searchKeyword ? 'No matches' : 'No reviews yet'}
        buttons={true}
        moreBtn={false}
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

export default ReviewedMovieList;
