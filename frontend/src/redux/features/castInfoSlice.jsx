import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

// initial state
const initialState = {
  castInformation: [],
  castCredits: [],
  dataStatus: null,
};

const base = apiEndpoint;
export const castInfo = createAsyncThunk(
  'cast/info',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base}/cast/${id}`);
      const castData = response.data.castInfo;
      const castCredits = response.data.castCredits;
      return { castData, castCredits };
    } catch (error) {
      const errorMsg = error.response.data.message;
      // leads to 'builder.addcase rejected'
      return rejectWithValue(errorMsg);
    }
  }
);

const castInfoSlice = createSlice({
  name: 'cast',
  initialState,
  reducers: {},

  // extra reducers to handle http request with promise
  extraReducers: (builder) => {
    // movie detail
    builder.addCase(castInfo.pending, (state, action) => {
      return { ...state, dataStatus: 'pending' };
    });

    builder.addCase(castInfo.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          castInformation: action.payload.castData,
          // movieCast.id = actor/actress's id for their info page
          castCredits: action.payload.castCredits,
          dataStatus: 'success',
        };
      } else return state;
    });

    builder.addCase(castInfo.rejected, (state, action) => {
      return {
        ...state,
        dataStatus: 'rejected',
      };
    });
  },
});

export default castInfoSlice.reducer;
