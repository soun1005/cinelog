// this hook is used to get all reviews of the user
import { useEffect } from 'react';
import { loadFavouritedList } from '../redux/features/favouriteListSlice';
import { useDispatch, useSelector } from 'react-redux';

export const FavouriteListService = () => {
  const dispatch = useDispatch();
  const { favouritedList, movieData } = useSelector((state) => state.favourite);
  console.log('favouritedList:', favouritedList);
  console.log('movieData:', movieData);

  useEffect(() => {
    dispatch(loadFavouritedList());
  }, [dispatch]);

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
};

export default FavouriteListService;
