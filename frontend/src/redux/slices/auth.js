import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userName: null,
        isAuthenticated: false,
    },
    reducers: {
        login: (state, actions) => {
            state.isAuthenticated = true;
            state.token = actions.payload.token;
            state.userName = actions.payload.user.name;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.userName = null;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;