import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { articleApi } from './api/articleApi';
// import { userApi } from './api/userApi';

const store = configureStore({
  reducer: {
    // [userApi.reducerPath]: userApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware),
});

setupListeners(store.dispatch);

export default store;
