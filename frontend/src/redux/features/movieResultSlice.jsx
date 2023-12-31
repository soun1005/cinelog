import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

// initial state
const initialState = {
  movieResults: [],
  searchStatus: null,
  searchedKeyword: '',
};

const base = apiEndpoint;

export const moviesSearch = createAsyncThunk(
  'movies/search',
  //   searchValue as paramaeter -> keyword given in SearchBar component
  async (searchValue, { rejectWithValue }) => {
    try {
      // api call to backend with searched value as query
      const response = await axios.get(`${base}/search?query=${searchValue}`);
      const values = response.data;
      const searchKeyword = searchValue;

      // return the data to use in extra reducers when fullfilled
      return { values, searchKeyword };
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
        return {
          ...state,
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
