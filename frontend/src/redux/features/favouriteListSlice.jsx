import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

// initial state
const initialState = {
  token: localStorage.getItem('token'),
  favouriteError: '',
  postFavouriteStatus: 'false',
  favouriteStatus: '',
  favouriteStatusError: '',
  favouriteStatusLoaded: '',
};

const base = apiEndpoint;

export const postFavouriteList = createAsyncThunk(
  'favouriteList/create',
  // promise
  async (favourite, { rejectWithValue }) => {
    // console.log(review);
    try {
      await axios.post(
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
      return;
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
    // console.log(review);
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
      // leads to 'builder.addcase rejected'
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

const favouriteListSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {},

  //   extra reducers to handle http request
  extraReducers: (builder) => {
    // when loginUser function result is 'pending'
    builder.addCase(postFavouriteList.pending, (state, action) => {
      return { ...state, postFavouriteStatus: 'pending' };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(postFavouriteList.fulfilled, (state, action) => {
      return {
        ...state,
        postFavouriteStatus: 'success',
        favouriteStatus: 'true',
      };
    });
    builder.addCase(postFavouriteList.rejected, (state, action) => {
      return {
        ...state,
        reviewError: action.payload,
        postFavouriteStatus: 'failed',
      };
    });

    /************get favourite status*************/
    // when loginUser function result is 'pending'
    builder.addCase(favouriteStatus.pending, (state, action) => {
      return {
        ...state,
        favouriteStatusLoaded: 'pending',
      };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(favouriteStatus.fulfilled, (state, action) => {
      return {
        ...state,
        favouriteStatus: action.payload,
        favouriteStatusLoaded: 'success',
      };
    });
    builder.addCase(favouriteStatus.rejected, (state, action) => {
      return {
        ...state,
        reviewError: action.payload,
        favouriteStatusError: 'failed',
      };
    });
  },
});

export default favouriteListSlice.reducer;
