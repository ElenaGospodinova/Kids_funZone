import { configureStore } from '@reduxjs/toolkit';
import { api } from '../assets/utils/api'; 

export const store = configureStore({
  reducer: {
    // Add the API reducer
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
 export default store;