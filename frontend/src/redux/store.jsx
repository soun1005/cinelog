import { configureStore } from '@reduxjs/toolkit';
import movieResultSlice from './features/movieResultSlice';
import movieInfoSlice from './features/movieInfoSlice';
import authSlice from './features/authSlice';
import reviewSlice from './features/reviewSlice';
import profileSlice from './features/profileSlice';
import favouriteListSlice from './features/favouriteListSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['review', 'favourite'],
  blacklist: ['profile', 'search', 'info', 'auth'],
};

const reducer = combineReducers({
  review: reviewSlice,
  favourite: favouriteListSlice,
  // profile: profileSlice,
  // search: movieResultSlice,
  // info: movieInfoSlice,
  // auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    persistedReducer,
    search: movieResultSlice,
    info: movieInfoSlice,
    auth: authSlice,
    review: reviewSlice,
    profile: profileSlice,
    favourite: favouriteListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
