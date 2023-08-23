import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

// when there's token, isUserLoggedIn is true
const loggedIn = !!localStorage.getItem('token');

// initial state
const initialState = {
  token: localStorage.getItem('token'),
  reviewError: '',
  isUserLoggedIn: loggedIn,
  postReviewStatus: '',
  deleteReviewStatus: '',
};

const base = apiEndpoint;

export const postReview = createAsyncThunk(
  'review/create',
  // promise
  async (review, { rejectWithValue }) => {
    console.log(review);
    try {
      await axios.post(
        `${base}/review`,
        {
          reviewTitle: review.reviewTitle,
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

const createReviewSlice = createSlice({
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

export default createReviewSlice.reducer;
