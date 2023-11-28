import { useState } from 'react';
import ReviewService from '../api/reviewService';
import ProfileList from '../components/ProfileList';
import SortByDate from '../components/filterData/SortByDate';

const ReviewedMovieList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  //sort order is passed to redux and used as endpoint
  const [sort, setSort] = useState({ sort: 'date', order: 'asc' });

  const {
    mergedData: data,
    dataLength,
    totalPages,
  } = ReviewService({
    pageNum: pageNumber,
    sortBy: sort.sort,
    sortOrder: sort.order,
  });

  // if (!data || !dataLength || !totalPages) {
  //   // display loader here or error
  //   return null;
  // }

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  return (
    <div className="review-list-page page">
      <h3 className="pagination-index">
        Page of {pageNumber + 1} / {totalPages}
      </h3>
      <div className="filter__container">
        {/* {setRatingFilter && <FilterByRating setFilterStar={setStar} />} */}
        <SortByDate setDate={setSort} />
        {/* {setSearchFilter && <FilterBySearchbar setSearch={setSearchKeyword} />} */}
      </div>

      <ProfileList
        data={data}
        listTitle="My reviews"
        noDataMsg="No reviews yet"
        noMatchMsg="No matched review"
        buttons={true}
        moreBtn={false}
        dataLength={dataLength}
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
