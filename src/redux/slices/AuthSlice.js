import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: localStorage.getItem('auth'),
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectToken: (state) => state.authToken,
  },
  reducers: {
    setToken: (state, action) => {
      state.authToken = action.payload;
    },
    removeToken: (state) => {
      state.authToken = null;
    },
  },
});

export const { setToken, removeToken } = AuthSlice.actions;
export const { selectToken } = AuthSlice.selectors;
export default AuthSlice.reducer;
