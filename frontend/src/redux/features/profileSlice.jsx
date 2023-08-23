import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

const isUserLoaded = !!localStorage.getItem('token');

// initial state
const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  userId: '',
  userName: '',
  profileStatus: isUserLoaded,
  profileUpdated: null,
  movieData: '',
  reviews: '',
  reviewUpdate: '',
};

const base = apiEndpoint;

// LOGIN
export const loadUser = createAsyncThunk(
  'profile/loadUser',
  // promise
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.post(
          `${base}/profile`,
          {},
          // the value that user send to DB by API
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(res.data);
        const userName = res.data.username;
        const userId = res.data.userId;
        // const userId = res.data;

        // will be saved in the 'action.payload'
        // the data that is received by API -> to display on profile
        return { userName, userId };
      }
    } catch (error) {
      const errorMsg = error.response.data.message;
      return rejectWithValue(errorMsg);
    }
  }
);

// GET reviews
// main function to call API to login
export const loadReviews = createAsyncThunk(
  'profile/loadReviews',
  // promise
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.post(
          `${base}/profile/reviews`,
          {},
          // the value that user send to DB by API
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const reviews = res.data.reviews;
        const movieData = res.data.movieData;

        // will be saved in the 'action.payload'
        // the data that is received by API -> to display on profile
        return { reviews, movieData };
      }
    } catch (error) {
      const errorMsg = error.response.data.message;
      return rejectWithValue(errorMsg);
    }
  }
);

// DELETE reviews
export const deleteReview = createAsyncThunk(
  `profile/deleteReview`,
  // promise
  async (reviewId, { rejectWithValue }) => {
    // console.log(review);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.delete(`${base}/review/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return reviewId;
      }
    } catch (error) {
      console.log(error);
      const errorMsg = error.response.data.error;
      // leads to 'builder.addcase rejected'
      return rejectWithValue(errorMsg);
    }
  }
);

// EDIT review
export const editReview = createAsyncThunk(
  'profileEdit/editName',
  // promise
  async (review, { rejectWithValue }) => {
    console.log(review);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.put(
          `${base}/review/${review.mediaId}`,
          {
            // the value that user send to DB by API
            // request body
            reviewTitle: review.data.reviewTitle,
            date: review.data.date,
            comment: review.data.comment,
            ratings: review.data.ratings,
            mediaId: review.mediaId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { reviewTitle, date, comment, ratings, mediaId } = res.data;
        return { reviewTitle, date, comment, ratings, mediaId };
        // return res;
      }
    } catch (error) {
      console.log(error);
      const errorMsg = error.response.data.message;
      return rejectWithValue(errorMsg);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},

  // extra reducers to handle http request with promise
  extraReducers: (builder) => {
    // when loadUser function result is 'pending'
    builder.addCase(loadUser.pending, (state, action) => {
      return { ...state, profileStatus: 'pending' };
    });

    // when loadUser function result is 'fullfilled'
    builder.addCase(loadUser.fulfilled, (state, action) => {
      // console.log(action.payload);
      if (action.payload) {
        // console.log('action payload', action.payload);
        return {
          ...state,
          userName: action.payload.userName,
          userId: action.payload.userId,
          profileStatus: 'success',
        };
      } else return state;
    });

    // when loadUser function result is 'rejected'
    builder.addCase(loadUser.rejected, (state, action) => {
      return {
        ...state,
        profileStatus: 'rejected',
      };
    });

    //**********load reviews *************
    builder.addCase(loadReviews.pending, (state, action) => {
      return { ...state, profileStatus: 'pending' };
    });

    // when loadUser function result is 'fullfilled'
    builder.addCase(loadReviews.fulfilled, (state, action) => {
      // console.log(action.payload);
      if (action.payload) {
        return {
          ...state,
          reviews: action.payload.reviews,
          movieData: action.payload.movieData,
          profileStatus: 'success',
        };
      } else return state;
    });

    // when loadUser function result is 'rejected'
    builder.addCase(loadReviews.rejected, (state, action) => {
      return {
        ...state,
        profileStatus: 'rejected',
      };
    });

    //*************delete review*************
    builder.addCase(deleteReview.pending, (state, action) => {
      return { ...state, deleteReviewStatus: 'pending' };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      // console.log('action.payload', action.payload);
      const deletedReviewId = action.payload;
      // Update state to remove the deleted review
      // console.log('initialState.reviews', state.reviews);
      const updatedReviews = state.reviews.filter(
        (review) => review.mediaId !== deletedReviewId
      );
      const updatedMovieData = state.movieData.filter(
        (movie) => movie.mediaId !== deletedReviewId
      );
      return {
        ...state,
        reviews: updatedReviews,
        movieData: updatedMovieData,
        deleteReviewStatus: 'success',
      };
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      return {
        ...state,
        reviewError: action.payload,
        deleteReviewStatus: 'failed',
      };
    });

    //*************edit review*************
    builder.addCase(editReview.pending, (state, action) => {
      return { ...state, reviewUpdate: 'pending' };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(editReview.fulfilled, (state, action) => {
      console.log('redux action.payload', action.payload);
      const editedReviewId = action.payload.mediaId;
      const updatedReview = state.reviews.filter(
        (review) => review.mediaId === editedReviewId
      );
      const updatedMovieData = state.movieData.filter(
        (movie) => movie.mediaId === editedReviewId
      );
      return {
        ...state,
        reviews: updatedReview,
        movieData: updatedMovieData,
        deleteReviewStatus: 'success',
      };
    });
    builder.addCase(editReview.rejected, (state, action) => {
      return {
        ...state,
        reviewError: action.payload,
        reviewUpdate: 'failed',
      };
    });
  },
});

export default profileSlice.reducer;
