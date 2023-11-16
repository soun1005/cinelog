import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

// initial state
const initialState = {
  userId: '',
  userName: '',
  profileStatus: '',
  profileUpdated: null,
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
  },
});

export default profileSlice.reducer;
