import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const isUserLoaded = !!localStorage.getItem('token');

// initial state
const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  id: '',
  profileStatus: isUserLoaded,
  profileUpdated: null,
};

const base = 'http://localhost:4000/api/v1';

// main function to call API to login
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
        const userName = res.data;

        // will be saved in the 'action.payload'
        // the data that is received by API -> to display on profile
        return { userName };
      }
    } catch (error) {
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
      console.log(action.payload);
      if (action.payload) {
        return {
          ...state,
          userName: action.payload.userName,
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
  },
});

export default profileSlice.reducer;
