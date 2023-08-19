import { useEffect } from 'react';
import { loadReviews } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewDetailComponent from '../components/ReviewDetailComponent';
import { NavLink } from 'react-router-dom';

const ReviewDetail = () => {
  // 1. get movie id from the URL
  // 2. get movie info(by hook) & get review from back (make route)

  const dispatch = useDispatch();
  // reviews = array
  const { reviews, movieData } = useSelector((state) => state.profile);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch]);

  if (!reviews || !movieData) {
    return null;
  }

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

  console.log(mergedData);

  const matchedMedia = mergedData.find((obj) => obj.mediaId === id);

  console.log(matchedMedia);

  return (
    <div className="review-page">
      <div className="review-page__wrap">
        <ReviewDetailComponent data={matchedMedia} />
        <div className="btn-wrap">
          <NavLink>EDIT</NavLink>
          <NavLink>DELETE</NavLink>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
