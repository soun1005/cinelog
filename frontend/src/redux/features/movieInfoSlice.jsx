import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

// initial state
const initialState = {
  movieCrew: [],
  movieCast: [],
  movieInfo: [],
  dataStatus: null,
};

const base = apiEndpoint;

export const movieInfo = createAsyncThunk(
  'movies/info',
  //   searchValue as paramaeter -> keyword given in SearchBar component
  async (id, { rejectWithValue }) => {
    // console.log(searchValue);
    try {
      const response = await axios.get(`${base}/${id}`);
      // console.log('response:', response);
      // two filtered data (cast, crew)
      const movieInfo = response.data.movieData;
      const movieCast = response.data.creditData.filteredCast;
      const movieCrew = response.data.creditData.filteredCrew;

      // console.log('asyncThunk movieCast:', movieCast, 'movieCrew:', movieCrew);

      return { movieInfo, movieCast, movieCrew };
    } catch (error) {
      const errorMsg = error.response.data.message;
      // leads to 'builder.addcase rejected'
      return rejectWithValue(errorMsg);
    }
  }
);

const movieInfoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},

  // extra reducers to handle http request with promise
  extraReducers: (builder) => {
    // movie detail
    builder.addCase(movieInfo.pending, (state, action) => {
      // console.log('creditSlice = action.payload:', action.payload);
      return { ...state, dataStatus: 'pending' };
    });

    builder.addCase(movieInfo.fulfilled, (state, action) => {
      // console.log('credit action.payload:', action.payload);
      if (action.payload) {
        return {
          ...state,
          // movieCredit: action.payload.values,
          movieInfo: action.payload.movieInfo,
          movieCast: action.payload.movieCast,
          movieCrew: action.payload.movieCrew[0],
          dataStatus: 'success',
        };
      } else return state;
    });

    builder.addCase(movieInfo.rejected, (state, action) => {
      return {
        ...state,
        searchStatus: 'rejected',
      };
    });
  },
});

export default movieInfoSlice.reducer;
