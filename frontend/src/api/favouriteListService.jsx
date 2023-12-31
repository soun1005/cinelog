// this hook is used to get all reviews of the user
import { useEffect } from 'react';
import { loadFavouritedList } from '../redux/features/favouriteListSlice';
import { useDispatch, useSelector } from 'react-redux';

export const FavouriteListService = ({ pageNum, sortBy, sortOrder, title }) => {
  const dispatch = useDispatch();

  // dispatch user's favourite list
  useEffect(() => {
    dispatch(loadFavouritedList({ pageNum, sortBy, sortOrder, title }));
  }, [dispatch, pageNum, sortBy, sortOrder, title]);

  // get data from redux state
  const { favouritedList, movieData, totalPages, dataLength } = useSelector(
    (state) => state.favourite
  );

  // when there are no data, stop
  if (!favouritedList || !movieData || !dataLength) {
    return { mergedData: [], totalPages, dataLength };
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
