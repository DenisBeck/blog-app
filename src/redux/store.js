import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { articleApi } from './api/articleApi';
import { userApi } from './api/userApi';
import authReducer from './slices/AuthSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([articleApi.middleware, userApi.middleware]),
});

setupListeners(store.dispatch);

export default store;
