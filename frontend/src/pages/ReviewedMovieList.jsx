import { useState } from 'react';
import ReviewService from '../api/reviewService';
import ProfileList from '../components/ProfileList';
import Sorting from '../components/filterData/Sorting';
import ListTitle from '../components/ListTitle';

const ReviewedMovieList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  //sort order is passed to redux and used as endpoint
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });

  const {
    mergedData: data,
    dataLength,
    totalPages,
  } = ReviewService({
    pageNum: pageNumber,
    sortBy: sort.sort,
    sortOrder: sort.order,
  });

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  return (
    <div className="review-list-page page">
      <div className="review-list-page__title">
        <ListTitle listTitle="Reviews" dataLength={dataLength} />
      </div>
      <h3 className="pagination-index">
        Page of {pageNumber + 1} / {totalPages}
      </h3>

      {/* Filters */}

      <div className="filter__container">
        {/* {setRatingFilter && <FilterByRating setFilterStar={setStar} />} */}
        <Sorting setDate={setSort} ratings={true} />
        {/* {setSearchFilter && <FilterBySearchbar setSearch={setSearchKeyword} />} */}
      </div>

      <ProfileList
        data={data}
        listTitle={false}
        noDataMsg="No reviews yet"
        noMatchMsg="No matched review"
        buttons={true}
        moreBtn={false}
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

export default ReviewedMovieList;
