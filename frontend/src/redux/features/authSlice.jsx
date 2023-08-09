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

// main function to call API to login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  // promise
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:3001/api/v1/user/login', {
        email: user.email,
        password: user.password,
      });
      // token location : data.body.token(info in Swagger)
      const token = res.data.body.token;
      localStorage.setItem('token', token);
      // will be saved in the 'action.payload'
      return token;
    } catch (error) {
      const errorMsg = error.response.data.message;
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
      return { ...state, loginStatus: 'pending' };
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
