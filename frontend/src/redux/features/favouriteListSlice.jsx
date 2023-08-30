import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

// initial state
const initialState = {
  token: localStorage.getItem('token'),
  // post
  favouritePostError: '',
  favouriteLoaded: '',
  // load
  favouritedList: '',
  favouriteListLoaded: false,
  // status
  favouriteStatus: false,
  statusLoaded: false,
  // delete
  deleteStatus: '',
  // etc
  movieData: '',
};

const base = apiEndpoint;

export const postFavouriteList = createAsyncThunk(
  'favouriteList/create',
  // promise
  async (favourite, { rejectWithValue }) => {
    // console.log(review);
    try {
      const res = await axios.post(
        `${base}/favourite`,
        {
          mediaId: favourite.mediaId,
          userId: favourite.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const savedFavouritedMovies = res.data;

      return savedFavouritedMovies;
    } catch (error) {
      console.log(error);
      const errorMsg = error.response.data.error;
      // leads to 'builder.addcase rejected'
      return rejectWithValue(errorMsg);
    }
  }
);

export const deleteFavourite = createAsyncThunk(
  `favourite/deleteFavourite`,
  // promise
  async (movieId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.delete(`${base}/favourite/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        return movieId;
      }
    } catch (error) {
      console.log(error);
      const errorMsg = error.response.data.error;
      return rejectWithValue(errorMsg);
    }
  }
);

export const favouriteStatus = createAsyncThunk(
  `favourite/status`,
  async (favourite, { rejectWithValue }) => {
    // promise
    try {
      const response = await axios.post(
        `${base}/favourite/status`,
        {
          mediaId: favourite.mediaId,
          userId: favourite.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = response.data.favourited;
      return data;
    } catch (error) {
      console.log(error);
      const errorMsg = error.response.data.error;
      return rejectWithValue(errorMsg);
    }
  }
);

/***********load movies that are favourited***********/
export const loadFavouritedList = createAsyncThunk(
  'favourite/loadReviews',
  // promise
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.post(
          `${base}/favourites`,
          {},
          // the value that user send to DB by API
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const favouritedList = res.data.favouritedList;
        const movieData = res.data.movieData;

        return { favouritedList, movieData };
      }
    } catch (error) {
      const errorMsg = error.response.data.message;
      return rejectWithValue(errorMsg);
    }
  }
);

const favouriteListSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {},

  /*************CREATE favourit**************/
  extraReducers: (builder) => {
    // CREATE favourite
    builder.addCase(postFavouriteList.pending, (state, action) => {
      return { ...state, favouriteLoaded: 'pending' };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(postFavouriteList.fulfilled, (state, action) => {
      return {
        ...state,
        favouritedList: [...state.favouritedList, action.payload],
        favouriteStatus: true,
        favouriteLoaded: 'success',
      };
    });
    builder.addCase(postFavouriteList.rejected, (state, action) => {
      return {
        ...state,
        favouritePostError: action.payload,
      };
    });

    //*************DELETE favourite*************
    builder.addCase(deleteFavourite.pending, (state, action) => {
      return { ...state, deleteStatus: 'pending' };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(deleteFavourite.fulfilled, (state, action) => {
      // action.payload = meddiaId
      const deletedMediaId = action.payload;
      // Update state to remove the deleted review
      // current(state) : to modify the current state
      // const prevState = current(state);
      // console.log(prevState);

      const updatedMedia = state.favouritedList.filter(
        (media) => media.mediaId !== deletedMediaId
      );

      const updatedMovieData = state.movieData.filter(
        (movie) => movie.mediaId !== deletedMediaId || movie
      );

      return {
        ...state,
        favouritedList: updatedMedia,
        movieData: updatedMovieData,
        favouriteStatus: false,
        deleteStatus: 'success',
      };
    });
    builder.addCase(deleteFavourite.rejected, (state, action) => {
      return {
        ...state,
        deleteStatus: action.payload,
      };
    });

    /************get favourite status*************/
    builder.addCase(favouriteStatus.pending, (state, action) => {
      return {
        ...state,
        statusLoaded: 'pending',
      };
    });
    builder.addCase(favouriteStatus.fulfilled, (state, action) => {
      return {
        ...state,
        // action.payload : boolean
        favouriteStatus: action.payload,
        statusLoaded: 'success',
      };
    });
    builder.addCase(favouriteStatus.rejected, (state, action) => {
      return {
        ...state,
        statusLoaded: action.payload,
      };
    });

    /************load favourited movies*************/
    builder.addCase(loadFavouritedList.pending, (state, action) => {
      return {
        ...state,
        favouriteListLoaded: 'pending',
      };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(loadFavouritedList.fulfilled, (state, action) => {
      console.log('favourited list', action.payload);
      return {
        ...state,
        favouritedList: action.payload.favouritedList,
        movieData: action.payload.movieData,
        favouriteListLoaded: 'success',
      };
    });
    builder.addCase(loadFavouritedList.rejected, (state, action) => {
      return {
        ...state,
        favouriteListLoaded: action.payload,
      };
    });
  },
});

export default favouriteListSlice.reducer;
