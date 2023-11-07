import ReviewService from '../api/reviewService';
import ProfileList from '../components/ProfileList';

const ReviewedMovieList = () => {
  const data = ReviewService();
  if (!data) {
    // display loader here or error
    return null;
  }
  console.log(data);

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
      />
    </div>
  );
};

export default ReviewedMovieList;
