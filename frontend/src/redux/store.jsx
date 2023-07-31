import { configureStore } from '@reduxjs/toolkit';
import movieResultSlice from './features/movieResultSlice';

const store = configureStore({
  reducer: {
    search: movieResultSlice,
  },
});

export default store;
