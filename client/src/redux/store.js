import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Ensure the correct path to your userSlice.js file

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
