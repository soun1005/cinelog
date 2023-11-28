// this hook is used to get all reviews of the user
import { useEffect } from 'react';
import { loadReviews } from '../redux/features/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';

export const ReviewService = ({ pageNum, sortBy, sortOrder }) => {
  const dispatch = useDispatch();

  // dispatch reduce to load review lists
  useEffect(() => {
    dispatch(loadReviews({ pageNum, sortBy, sortOrder }));
  }, [dispatch, pageNum, sortBy, sortOrder]);

  const { reviews, movieData, totalPages, dataLength } = useSelector(
    (state) => state.review
  );

  console.log(totalPages);

  if (!reviews || !movieData || !dataLength) {
    return { mergedData: [], totalPages, dataLength };
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

  return { mergedData, totalPages, dataLength };
};

export default ReviewService;
