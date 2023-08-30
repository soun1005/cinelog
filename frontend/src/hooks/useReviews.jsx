import { useSelector } from 'react-redux';

export const useReviews = () => {
  // reviews = array

  const { reviews, movieData } = useSelector((state) => state.review);

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
  return mergedData;
};

export default useReviews;
