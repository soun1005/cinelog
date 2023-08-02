import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initial state
const initialState = {
  movieCredit: [],
  searchStatus: null,
};

const base = 'http://localhost:4000/api/v1';

export const movieDetail = createAsyncThunk(
  'movies/detail',
  //   searchValue as paramaeter -> keyword given in SearchBar component
  async (id, { rejectWithValue }) => {
    // console.log(searchValue);
    try {
      const response = await axios.get(`${base}/${id}`);
      console.log('response:', response);
      const movieCredit = response.data;
      console.log('movie credit', movieCredit);
      return { movieCredit };
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
      return { ...state, searchStatus: 'pending' };
    });

    builder.addCase(movieDetail.fulfilled, (state, action) => {
      if (action.payload.values) {
        console.log('credit action.payload:', action.payload);
        return {
          ...state,
          // movieCredit : data
          movieCredit: action.payload.values,
          searchStatus: 'success',
          // searchedKeyword: action.payload.searchKeyword,
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
