// this hook is used to get all reviews of the user
import { useEffect } from 'react';
import { loadFavouritedList } from '../redux/features/favouriteListSlice';
import { useDispatch, useSelector } from 'react-redux';

export const FavouriteListService = (page) => {
  const dispatch = useDispatch();

  const { favouritedList, movieData, totalPages, dataLength } = useSelector(
    (state) => state.favourite
  );

  useEffect(() => {
    dispatch(loadFavouritedList(page));
  }, [dispatch, page]);

  if (!favouritedList || !movieData || !totalPages || !dataLength) {
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

  return { mergedData, totalPages, dataLength };
};

export default FavouriteListService;
