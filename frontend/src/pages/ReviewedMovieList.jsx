import useReviews from '../hooks/useReviews';
import ProfileList from '../components/ProfileList';

const ReviewedMovieList = () => {
  const data = useReviews();
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
        buttons={true}
        moreBtn={false}
      />
    </div>
  );
};

export default ReviewedMovieList;
