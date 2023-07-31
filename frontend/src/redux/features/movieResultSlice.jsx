import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initial state
const initialState = {
  movieResults: [],
  searchStatus: null,
  searchedKeyword: '',
};

export const moviesSearch = createAsyncThunk(
  'movies/search',
  //   searchValue as paramaeter -> keyword given in SearchBar component
  async (searchValue, { rejectWithValue }) => {
    // console.log(searchValue);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/search?query=${searchValue}`
      );
      console.log('response:', response);
      const values = response.data;
      const searchKeyword = searchValue;
      return { values, searchKeyword };
      //   console.log('search data', values);
    } catch (error) {
      const errorMsg = error.response.data.message;
      // leads to 'builder.addcase rejected'
      return rejectWithValue(errorMsg);
    }
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},

  // extra reducers to handle http request with promise
  extraReducers: (builder) => {
    // when loadUser function result is 'pending'
    builder.addCase(moviesSearch.pending, (state, action) => {
      return { ...state, searchStatus: 'pending' };
    });

    // when loadUser function result is 'fullfilled'
    builder.addCase(moviesSearch.fulfilled, (state, action) => {
      if (action.payload.values) {
        console.log('action.payload:', action.payload);
        return {
          ...state,
          // movieResults : data
          // searchedKeyword : searched keyword
          movieResults: action.payload.values,
          searchStatus: 'success',
          searchedKeyword: action.payload.searchKeyword,
        };
      } else return state;
    });

    // when loadUser function result is 'rejected'
    builder.addCase(moviesSearch.rejected, (state, action) => {
      return {
        ...state,
        searchStatus: 'rejected',
      };
    });
  },
});

export default movieSlice.reducer;
