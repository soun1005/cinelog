import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndpoint } from '../../constant/api';

const isUserLoaded = !!localStorage.getItem('token');

// initial state
const initialState = {
  token: localStorage.getItem('token'),
  loginStatus: '',
  loginError: '',
  userLoaded: isUserLoaded,
};

const base = apiEndpoint;

// to call API to login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  // promise
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base}/login`, {
        email: user.email,
        password: user.password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      // will be saved in the 'action.payload'
      return token;
    } catch (error) {
      const errorMsg = error.response.data.error;
      // leads to 'builder.addcase rejected'
      return rejectWithValue(errorMsg);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state, action) {
      localStorage.removeItem('token');
      return {
        ...state,
        token: '',
        loginStatus: '',
        loginError: '',
      };
    },
  },

  //   extra reducers to handle http request
  extraReducers: (builder) => {
    // when loginUser function result is 'pending'
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: 'pending', userLoaded: false };
    });
    // when loginUser function result is 'fullfilled'
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // if token exist
      if (action.payload) {
        return {
          ...state,
          token: action.payload,
          loginStatus: 'success',
          userLoaded: true,
        };
      } else return state;
    });
    // when loginUser function result is 'rejected'
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: 'rejected',
        loginError: action.payload,
      };
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
