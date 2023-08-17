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

  // const reviewBox = reviews.map((review) => {
  //   const { date, ratings, _id } = review;
  //   // const posterSrc = poster.includes('null') ? fallback : poster;

  //   return (
  //     // each page's URL set to be 'movie/id'
  //     <NavLink
  //       // nav link to review detail page
  //       to={'/'}
  //       key={_id}
  //       className="main__movie-container__link poster__link"
  //     >
  //       <div className="review-wrap">
  //         <div className="date">
  //           <span>Reviewed on :</span>
  //           <span>{date}</span>
  //         </div>
  //         <div className="rating">
  //           <span>{ratings}</span>
  //         </div>
  //       </div>
  //     </NavLink>
  //   );
  // });

  return (
    <div>
      {userName ? <p>Welcome, {userName}!</p> : <p>Loading user data...</p>}
      {/* <div className="review__container">{reviewBox}</div> */}
      <ProfileList listTitle="Reviewed" data={reviews} />
    </div>
  );
};

export default Profile;
