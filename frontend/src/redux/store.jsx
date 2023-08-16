import { configureStore } from '@reduxjs/toolkit';
import movieResultSlice from './features/movieResultSlice';
import movieInfoSlice from './features/movieInfoSlice';
import authSlice from './features/authSlice';
import reviewSlice from './features/reviewSlice';
import profileSlice from './features/profileSlice';

const store = configureStore({
  reducer: {
    search: movieResultSlice,
    info: movieInfoSlice,
    auth: authSlice,
    review: reviewSlice,
    profile: profileSlice,
  },
});

export default store;
