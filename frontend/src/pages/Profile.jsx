import { useEffect } from 'react';
import { loadUser } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileList from '../components/ProfileList';
import useReviews from '../hooks/useReviews';
import useFavouriteList from '../hooks/useFavouriteList';

const Profile = () => {
  const dispatch = useDispatch();
  const reviews = useReviews();
  const favourite = useFavouriteList();

  // console.log(favourite);

  // // To dispatch loadUser reducer
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { userName } = useSelector((state) => state.profile);

  if (!userName || !reviews || !favourite) {
    // display loader here or error
    return null;
  }

  // console.log('Data:', userName, data);

  return (
    <div className="profile-page page">
      <div className="profile__user-wrap">
        {userName ? <p>Welcome, {userName}!</p> : <p>Loading user data...</p>}
      </div>
      <div className="list__container">
        <ProfileList
          listTitle="My reviews"
          dateLabel="Revied on"
          data={reviews}
          noDataMsg="No reviews yet!"
          // path={`/profile/review/${mediaId}`}
        />
        <ProfileList
          listTitle="My favourites"
          dateLabel="Added on"
          data={favourite}
          noDataMsg="No favourited movies yet!"
        />
      </div>
    </div>
  );
};

export default Profile;
