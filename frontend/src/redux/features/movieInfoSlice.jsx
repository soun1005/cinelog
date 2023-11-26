import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

// initial state
const initialState = {
  movieCrew: [],
  movieCast: [],
  allCasts: [],
  movieInfo: [],
  dataStatus: null,
};

const base = apiEndpoint;

export const movieInfo = createAsyncThunk(
  'movies/info',
  //   searchValue as paramaeter -> keyword given in SearchBar component
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base}/${id}`);

      // two filtered data (cast, crew)
      const movieInfo = response.data.movieData;
      // cast data has all information
      const movieCast = response.data.creditData.filteredCast;
      const allMovieCasts = response.data.creditData.allCasts;
      const movieCrew = response.data.creditData.filteredCrew;

      return { movieInfo, movieCast, movieCrew, allMovieCasts };
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
      return { ...state, dataStatus: 'pending' };
    });

    builder.addCase(movieInfo.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          movieInfo: action.payload.movieInfo,
          // movieCast.id = actor/actress's id for their info page
          movieCast: action.payload.movieCast,
          movieCrew: action.payload.movieCrew[0],
          allCasts: action.payload.allMovieCasts,
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
