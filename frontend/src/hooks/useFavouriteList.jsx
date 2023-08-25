// this hook is used to get all reviews of the user
import { useEffect } from 'react';
import { loadFavouritedList } from '../redux/features/favouriteListSlice';
import { useDispatch, useSelector } from 'react-redux';

export const useReviews = () => {
  const dispatch = useDispatch();
  // reviews = array

  // To dispatch loadUser reducer
  useEffect(() => {
    dispatch(loadFavouritedList());
  }, [dispatch]);
  const { favouriteList, movieData } = useSelector((state) => state.review);
  console.log(favouriteList, movieData);
  if (!favouriteList || !movieData) {
    return null;
  }

  const mergedData = movieData.map((movie) => {
    const matchingData = favouriteList.find(
      (data) => data.mediaId === movie.mediaId
    );

    if (matchingData) {
      // If a matching review is found, create a new merged object
      return { ...movie, ...matchingData };
    }

    return movie;
  });

  return mergedData;
};

export default useReviews;
