import { useEffect } from 'react';
import { loadUser, loadReviews } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileList from '../components/ProfileList';

const Profile = () => {
  const dispatch = useDispatch();
  // reviews = array
  const { userName, reviews, movieData } = useSelector(
    (state) => state.profile
  );

  // console.log(movieCrew);

  // To dispatch loadUser reducer
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadReviews());
  }, [dispatch]);

  if (!reviews || !movieData) {
    return null;
  }
  console.log(movieData, reviews);

  const mergedData = movieData.map((movie) => {
    const matchingReview = reviews.find(
      (review) => review.mediaId === movie.mediaId
    );

    if (matchingReview) {
      // If a matching review is found, create a new merged object
      return { ...movie, ...matchingReview };
    }

    return movie;
  });

  console.log('mergedData:', mergedData);

  return (
    <div>
      <div className="profile__user-wrap">
        {userName ? <p>Welcome, {userName}!</p> : <p>Loading user data...</p>}
      </div>
      <div className="list__container">
        <ProfileList listTitle="Reviewed" data={mergedData} />
        <ProfileList listTitle="Reviewed" data={mergedData} />
      </div>
    </div>
  );
};

export default Profile;
