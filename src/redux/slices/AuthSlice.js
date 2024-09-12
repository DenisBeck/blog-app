import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: !!localStorage.getItem('auth'),
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectToken: (state) => state.authToken,
  },
  reducers: {
    setToken: (state) => {
      state.authToken = true;
    },
    removeToken: (state) => {
      state.authToken = false;
    },
  },
});

export const { setToken, removeToken } = AuthSlice.actions;
export const { selectToken } = AuthSlice.selectors;
export default AuthSlice.reducer;
