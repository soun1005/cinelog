import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initial state
const initialState = {
  movieCrew: [],
  movieCast: [],
  dataStatus: null,
};

const base = 'http://localhost:4000/api/v1';

export const movieDetail = createAsyncThunk(
  'movies/detail',
  //   searchValue as paramaeter -> keyword given in SearchBar component
  async (id, { rejectWithValue }) => {
    // console.log(searchValue);
    try {
      const response = await axios.get(`${base}/${id}`);
      // console.log('response:', response);
      // two filtered data (cast, crew)
      const movieCast = response.data.filteredCast;
      const movieCrew = response.data.filteredCrew;
      // console.log('asyncThunk movieCast:', movieCast, 'movieCrew:', movieCrew);

      return { movieCast, movieCrew };
    } catch (error) {
      const errorMsg = error.response.data.message;
      // leads to 'builder.addcase rejected'
      return rejectWithValue(errorMsg);
    }
  }
);

const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {},

  // extra reducers to handle http request with promise
  extraReducers: (builder) => {
    // movie detail
    builder.addCase(movieDetail.pending, (state, action) => {
      // console.log('creditSlice = action.payload:', action.payload);
      return { ...state, dataStatus: 'pending' };
    });

    builder.addCase(movieDetail.fulfilled, (state, action) => {
      // console.log('credit action.payload:', action.payload);
      if (action.payload) {
        return {
          ...state,
          // movieCredit: action.payload.values,
          // searchStatus: 'success',
          // searchedKeyword: action.payload.searchKeyword,
          movieCast: action.payload.movieCast,
          movieCrew: action.payload.movieCrew,
          dataStatus: 'success',
        };
      } else return state;
    });

    builder.addCase(movieDetail.rejected, (state, action) => {
      return {
        ...state,
        searchStatus: 'rejected',
      };
    });
  },
});

export default creditSlice.reducer;
