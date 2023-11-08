import { configureStore } from '@reduxjs/toolkit';
import movieResultSlice from './features/movieResultSlice';
import movieInfoSlice from './features/movieInfoSlice';
import authSlice from './features/authSlice';
import reviewSlice from './features/reviewSlice';
import profileSlice from './features/profileSlice';
import favouriteListSlice from './features/favouriteListSlice';
import castInfoSlice from './features/castInfoSlice';
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
  blacklist: ['profile', 'search', 'info', 'auth', 'cast'],
};

const rootReducer = combineReducers({
  review: reviewSlice,
  favourite: favouriteListSlice,
  profile: profileSlice,
  search: movieResultSlice,
  info: movieInfoSlice,
  auth: authSlice,
  cast: castInfoSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
