import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../redux/slices/auth';
import noteSlice from "./slices/noteSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        note: noteSlice
    }
})