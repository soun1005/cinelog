import { configureStore } from '@reduxjs/toolkit';
import movieResultSlice from './features/movieResultSlice';
import movieInfoSlice from './features/movieInfoSlice';
import authSlice from './features/authSlice';
import createReviewSlice from './features/createReviewSlice';
import profileSlice from './features/profileSlice';

const store = configureStore({
  reducer: {
    search: movieResultSlice,
    info: movieInfoSlice,
    auth: authSlice,
    review: createReviewSlice,
    profile: profileSlice,
  },
});

export default store;
