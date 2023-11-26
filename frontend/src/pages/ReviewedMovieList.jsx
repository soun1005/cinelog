import { useState } from 'react';
import ReviewService from '../api/reviewService';
import ProfileList from '../components/ProfileList';

const ReviewedMovieList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const {
    mergedData: data,
    dataLength,
    totalPages,
  } = ReviewService(pageNumber);
  if (!data) {
    // display loader here or error
    return null;
  }

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  return (
    <div className="review-list-page page">
      <h3>
        Page of {pageNumber + 1} / {totalPages}
      </h3>
      <ProfileList
        data={data}
        listTitle="My reviews"
        noDataMsg="No reviews yet"
        noMatchMsg="No matched review"
        buttons={true}
        moreBtn={false}
        dataLength={dataLength}
        setSearchFilter={true}
        setRatingFilter={true}
        setSortFilter={true}
      />
      <div className="review-list-page__pagination">
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
