// this hook is used to get all reviews of the user
import { useEffect } from 'react';
import { loadReviews } from '../redux/features/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';

export const useReviews = () => {
  const dispatch = useDispatch();
  // reviews = array

  // To dispatch loadUser reducer
  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch]);
  const { reviews, movieData } = useSelector((state) => state.review);
  console.log(reviews, movieData);
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

  return mergedData;
};

export default useReviews;
