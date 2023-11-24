import ReviewService from '../api/reviewService';
import ProfileList from '../components/ProfileList';

const ReviewedMovieList = () => {
  const data = ReviewService();
  if (!data) {
    // display loader here or error
    return null;
  }

  return (
    <div className="review-list-page page">
      <ProfileList
        data={data}
        listTitle="My reviews"
        noDataMsg="No reviews yet"
        noMatchMsg="No matched review"
        buttons={true}
        moreBtn={false}
        dataLength={data.length}
        setSearchFilter={true}
        setRatingFilter={true}
        setSortFilter={true}
      />
    </div>
  );
};

export default ReviewedMovieList;
