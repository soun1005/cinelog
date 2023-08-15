import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// when there's token, isUserLoggedIn is true
const loggedIn = !!localStorage.getItem('token');

// initial state
const initialState = {
  token: localStorage.getItem('token'),
  reviewError: '',
  isUserLoggedIn: loggedIn,
  postReviewStatus: '',
};

const base = 'http://localhost:4000/api/v1';

// to call API to login
export const postReview = createAsyncThunk(
  'review/create',
  // promise
  async (review, { rejectWithValue }) => {
    try {
      await axios.post(
        `${base}/review`,
        {
          title: review.title,
          date: review.date,
          comment: review.comment,
          ratings: review.ratings,
          mediaId: review.mediaId,
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

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},

  //   extra reducers to handle http request
  extraReducers: (builder) => {
    // when loginUser function result is 'pending'
    builder.addCase(postReview.pending, (state, action) => {
      return { ...state, postReviewStatus: 'pending' };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(postReview.fulfilled, (state, action) => {
      // if token exist

      return {
        ...state,
        postReviewStatus: 'success',
      };
    });
    builder.addCase(postReview.rejected, (state, action) => {
      return {
        ...state,
        reviewError: action.payload,
        postReviewStatus: 'failed',
      };
    });
  },
});

export default reviewSlice.reducer;
