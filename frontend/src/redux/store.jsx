import { configureStore } from '@reduxjs/toolkit';
import movieResultSlice from './features/movieResultSlice';
import creditSlice from './features/creditSlice';

const store = configureStore({
  reducer: {
    search: movieResultSlice,
    credit: creditSlice,
  },
});

export default store;
