// this hook is used to get all reviews of the user
import { useEffect } from 'react';
import { loadFavouritedList } from '../redux/features/favouriteListSlice';
import { useDispatch, useSelector } from 'react-redux';

export const FavouriteListService = (page) => {
  const dispatch = useDispatch();

  // dispatch user's favourite list
  useEffect(() => {
    dispatch(loadFavouritedList(page));
  }, [dispatch, page]);

  // get data from redux state
  const { favouritedList, movieData, totalPages, dataLength } = useSelector(
    (state) => state.favourite
  );

  // when there are no data, stop
  if (!favouritedList || !movieData || !dataLength) {
    return { mergedData: [], totalPages, dataLength };
  }

  // doesnt work
  console.log('favouritedList:', favouritedList);
  console.log('favouritedList movieData:', movieData);

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
  // this works
  console.log('mergedData:', mergedData);
  return { mergedData, totalPages, dataLength };
};

export default FavouriteListService;
