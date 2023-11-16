import { useEffect } from 'react';
import { loadUser } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileList from '../components/ProfileList';
import ReviewService from '../api/reviewService';
import FavouriteListService from '../api/favouriteListService';

const Profile = () => {
  const dispatch = useDispatch();
  const reviews = ReviewService();
  const favourite = FavouriteListService();
  const auth = useSelector((state) => state.auth);
  const { userName } = useSelector((state) => state.profile);
  // // To dispatch loadUser reducer
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, auth]);

  if (!userName || !reviews || !favourite) {
    // display loader here or error
    return null;
  }

  console.log(reviews.length);
  const limitedReviews = reviews.slice(0, 5);
  const limitedFavourite = favourite.slice(0, 5);

  return (
    <div className="profile-page page">
      <div className="profile__user-wrap">
        {userName ? <p>Welcome, {userName}!</p> : <p>Loading user data...</p>}
      </div>
      <div className="list__container">
        <ProfileList
          listTitle="My reviews"
          dateLabel="Revied on"
          data={limitedReviews}
          noDataMsg="No reviews yet!"
          pagePath={'/profile/reviews'}
          dataLength={reviews.length}
        />
        <ProfileList
          listTitle="My favourites"
          dateLabel="Added on"
          data={limitedFavourite}
          noDataMsg="No favourited movies yet!"
          isReview={false}
          buttons={false}
          pagePath={'/profile/favourites'}
          dataLength={favourite.length}
        />
      </div>
    </div>
  );
};

export default Profile;
