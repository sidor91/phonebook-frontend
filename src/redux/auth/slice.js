import { persistReducer } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  signupUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  updateUserById,
} from './operations';

const initialState = {
  user: { id: '', name: '', avatarURL: '' },
  token: null,
  actions: { isLoggedIn: false, isRefreshing: false, isLoginFailed: false, error: null, isUserEdited: false },
};

const handlePending = state => {
  state.actions.isRefreshing = true;
};
const handleRejected = (state, action) => {
  state.user = initialState.user;
  state.token = initialState.token;
  state.actions.isRefreshing = false;
  state.actions.isLoginFailed = true;
  state.actions.error = action.payload;
};

const handleFulfilled = (state) => {
state.actions.isLoggedIn = true;
state.actions.isLoginFailed = false;
state.actions.isRefreshing = false;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsUserEdited: (state, action) => {
      state.actions.isUserEdited = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, handlePending)
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        handleFulfilled(state);
      })
      .addCase(signupUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        handleFulfilled(state);
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, state => {
        state.user = initialState.user;
        state.token = initialState.token;
        state.actions = initialState.actions;
      })
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        handleFulfilled(state);
      })
      .addCase(fetchCurrentUser.rejected, handleRejected)
      .addCase(updateUserById.pending, handlePending)
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.user = action.payload.user;
        handleFulfilled(state);
      })
      .addCase(updateUserById.rejected, handleRejected)
      .addDefaultCase(state => state);
  },
});

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token'],
};

export const authPersistedReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);

export const { setIsUserEdited } = authSlice.actions;
