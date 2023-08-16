import { useEffect } from 'react';
import { loadUser } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.profile);

  // To dispatch loadUser reducer
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
      {userName ? <p>Welcome, {userName}!</p> : <p>Loading user data...</p>}
    </div>
  );
};

export default Profile;
