import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const isUserLoaded = !!localStorage.getItem('token');

// initial state
const initialState = {
  token: localStorage.getItem('token'),
  loginStatus: '',
  loginError: '',
  userLoaded: isUserLoaded,
};

const base = 'http://localhost:4000/api/v1';

// to call API to login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  // promise
  async (user, { rejectWithValue }) => {
    // console.log('hello');
    try {
      const res = await axios.post(`${base}/login`, {
        email: user.email,
        password: user.password,
      });
      console.log(res);
      // token location : data.body.token(info in Swagger)
      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem('token', token);
      console.log('logged in');
      // will be saved in the 'action.payload'
      return token;
    } catch (error) {
      console.log(error);
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
