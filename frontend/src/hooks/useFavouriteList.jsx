// this hook is used to get all reviews of the user
import { useEffect } from 'react';
import { loadFavouritedList } from '../redux/features/favouriteListSlice';
import { useDispatch, useSelector } from 'react-redux';

export const useFavouriteList = () => {
  const dispatch = useDispatch();
  // reviews = array

  useEffect(() => {
    dispatch(loadFavouritedList());
  }, [dispatch]);

  const { favouritedList, movieData } = useSelector((state) => state.favourite);
  console.log('개빡치네', favouritedList, movieData);

  console.log(favouritedList, movieData);
  if (!favouritedList || !movieData) {
    return null;
  }

  const mergedData = movieData.map((movie) => {
    const matchingData = favouritedList.find(
      (data) => data.mediaId === movie.mediaId
    );

    if (matchingData) {
      // If a matching review is found, create a new merged object
      return { ...movie, ...matchingData };
    }

    return movie;
  });

  return mergedData;
  // return { favouriteList, movieData };
};

export default useFavouriteList;
