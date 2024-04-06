import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        loginUser(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutUser(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
        registerUser(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
    },
});

export const { loginUser, logoutUser, registerUser } = authSlice.actions;

export default authSlice.reducer;
