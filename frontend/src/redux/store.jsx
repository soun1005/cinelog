import { configureStore } from '@reduxjs/toolkit';
import movieResultSlice from './features/movieResultSlice';
import movieInfoSlice from './features/movieInfoSlice';
import authSlice from './features/authSlice';

const store = configureStore({
  reducer: {
    search: movieResultSlice,
    info: movieInfoSlice,
    auth: authSlice,
  },
});

export default store;
