import { useEffect } from 'react';
import { loadUser } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileList from '../components/ProfileList';
import useReviews from '../hooks/useReviews';

const Profile = () => {
  const dispatch = useDispatch();
  const data = useReviews();
  // // const profile = useSelector((state) => console.log(state.profile));

  // // To dispatch loadUser reducer
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { userName } = useSelector((state) => state.profile);

  if (!userName || !data) {
    // display loader here or error
    return null;
  }

  console.log('Data:', userName, data);

  return (
    <div>
      <div className="profile__user-wrap">
        {userName ? <p>Welcome, {userName}!</p> : <p>Loading user data...</p>}
      </div>
      <div className="list__container">
        <ProfileList
          listTitle="My reviews"
          data={data}
          noDataMsg="No reviews yet!"
        />
        <ProfileList
          listTitle="My favourites"
          data={data}
          noDataMsg="No reviews yet!"
        />
      </div>
    </div>
  );
};

export default Profile;
