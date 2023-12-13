import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

// when there's token, isUserLoggedIn is true
const loggedIn = !!localStorage.getItem('token');

// initial state
const initialState = {
  token: localStorage.getItem('token'),
  isUserLoggedIn: loggedIn,
  reviewStatus: false,
  statusLoaded: '',
  movieData: [],
  reviews: [],
  reviewUpdate: '',
  reviewError: '',
  postReviewStatus: '',
  deleteReviewStatus: '',
  totalPages: 0,
  dataLength: 0,
};

const base = apiEndpoint;

export const postReview = createAsyncThunk(
  'review/create',
  // promise
  async (review, { rejectWithValue }) => {
    try {
      await axios.post(
        `${base}/review`,
        {
          reviewTitle: review.reviewTitle,
          date: review.date,
          comment: review.comment,
          ratings: review.ratings,
          mediaId: review.mediaId,
          title: review.title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      return { review };
    } catch (error) {
      console.log(error);
      const errorMsg = error.response.data.error;
      // leads to 'builder.addcase rejected'
      return rejectWithValue(errorMsg);
    }
  }
);

// GET reviews
export const loadReviews = createAsyncThunk(
  'review/loadReviews',
  // promise
  async ({ pageNum, sortBy, sortOrder, title = '' }, { rejectWithValue }) => {
    // console.log(
    //   `${base}/profile/reviews?page=${pageNum}&sortBy=${sortBy}&sortOrder=${sortOrder}&title=${title}`
    // );
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.post(
          `${base}/profile/reviews?page=${pageNum}&sortBy=${sortBy}&sortOrder=${sortOrder}&title=${title}`,
          {},
          // the value that user send to DB by API
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const reviews = res.data.reviews;
        const movieData = res.data.movieData;
        const totalPages = res.data.totalPages;
        const dataLength = res.data.totalCount;

        // will be saved in the 'action.payload'
        // the data that is received by API -> to display on profile
        return { reviews, movieData, totalPages, dataLength };
      }
    } catch (error) {
      const errorMsg = error.response.data.message;
      return rejectWithValue(errorMsg);
    }
  }
);

// DELETE reviews
export const deleteReview = createAsyncThunk(
  `review/deleteReview`,
  // promise
  async (reviewId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.delete(`${base}/review/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return reviewId;
      }
    } catch (error) {
      const errorMsg = error.response.data.error;
      // leads to 'builder.addcase rejected'
      return rejectWithValue(errorMsg);
    }
  }
);

// EDIT review
export const editReview = createAsyncThunk(
  'review/editReview',
  // promise
  async (review, { rejectWithValue }) => {
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
      const errorMsg = error.response.data.message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const reviewStatus = createAsyncThunk(
  `review/status`,
  async (review, { rejectWithValue }) => {
    // promise
    try {
      const response = await axios.post(
        `${base}/review/status`,
        {
          mediaId: review.mediaId,
          userId: review.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = response.data;

      return data;
    } catch (error) {
      const errorMsg = error.response.data.error;
      return rejectWithValue(errorMsg);
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},

  /**********************CREATE review*****************/
  extraReducers: (builder) => {
    builder.addCase(postReview.pending, (state, action) => {
      return { ...state, postReviewStatus: 'pending' };
    });

    builder.addCase(postReview.fulfilled, (state, action) => {
      const newReview = action.payload;
      return {
        ...state,
        postReviewStatus: 'success',
        reviewStatus: true,
        reviews: [...state.reviews, newReview],
        dataLength: state.dataLength + 1,
      };
    });

    builder.addCase(postReview.rejected, (state, action) => {
      return {
        ...state,
        reviewError: action.payload,
        postReviewStatus: 'failed',
      };
    });

    /********************LOAD reviews ******************/
    builder.addCase(loadReviews.pending, (state, action) => {
      return { ...state, profileStatus: 'pending' };
    });

    // when loadUser function result is 'fullfilled'
    builder.addCase(loadReviews.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          reviews: action.payload.reviews,
          movieData: action.payload.movieData,
          totalPages: action.payload.totalPages,
          dataLength: action.payload.dataLength,
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

    /****************DELETE review****************/
    builder.addCase(deleteReview.pending, (state, action) => {
      return { ...state, deleteReviewStatus: 'pending' };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      const deletedReviewId = action.payload;
      // Update state to remove the deleted review

      const prevState = current(state);
      const updatedReviews = prevState.reviews.filter(
        (review) => review.mediaId !== deletedReviewId
      );
      const updatedMovieData = prevState.movieData.filter(
        (movie) => movie.mediaId !== deletedReviewId
      );

      return {
        ...state,
        reviews: updatedReviews,
        movieData: updatedMovieData,
        deleteReviewStatus: 'success',
        dataLength: state.dataLength - 1,
      };
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      return {
        ...state,
        reviewError: action.payload,
        deleteReviewStatus: 'failed',
      };
    });

    /****************UPDATE review****************/
    builder.addCase(editReview.pending, (state, action) => {
      return { ...state, reviewUpdate: 'pending' };
    });

    builder.addCase(editReview.fulfilled, (state, action) => {
      // 현재 state
      // const prevReviews = current(state);
      const editedReviewId = action.payload.mediaId;

      // 기존에 있던 리뷰 중 수정된 리뷰를 제거 -> 이짓거리를 하면 안됐음
      // const updatedReviewState = prevReviews.reviews.filter(
      //   (review) => review.mediaId !== editedReviewId
      // );

      // 수정된 리뷰를 다시 넣어버림
      // const updatedReviews = updatedReviewState.concat([action.payload]);

      const updatedMovieData = state.movieData.filter(
        (movie) => movie.mediaId === editedReviewId
      );
      return {
        ...state,
        reviews: [action.payload],
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

    /***************review status****************/
    builder.addCase(reviewStatus.pending, (state, action) => {
      return { ...state, statusLoaded: 'pending' };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(reviewStatus.fulfilled, (state, action) => {
      return {
        ...state,
        reviewStatus: action.payload,
        statusLoaded: 'success',
      };
    });
    builder.addCase(reviewStatus.rejected, (state, action) => {
      return {
        ...state,
        statusLoaded: action.payload,
      };
    });
  },
});

export default reviewSlice.reducer;
