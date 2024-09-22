import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import { apiSlice } from "./slices/apiSlice";
import { postApiSlice } from "./slices/postApiSlice"; // Import the postApiSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer, // Add postApiSlice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, postApiSlice.middleware), // Include postApiSlice middleware
  devTools: true,
});

export default store;
