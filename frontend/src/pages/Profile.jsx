import { useEffect } from 'react';
import { loadUser, loadReviews } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import ProfileList from '../components/ProfileList';

const Profile = () => {
  const dispatch = useDispatch();
  // reviews = array
  const { userName, reviews } = useSelector((state) => state.profile);

  // To dispatch loadUser reducer
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadReviews());
  }, [dispatch]);

  if (!reviews) {
    return null;
  }

  return (
    <div>
      {userName ? <p>Welcome, {userName}!</p> : <p>Loading user data...</p>}
      {/* <div className="review__container">{reviewBox}</div> */}
      <ProfileList listTitle="Reviewed" data={reviews} />
    </div>
  );
};

export default Profile;
