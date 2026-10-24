import { createSlice } from '@reduxjs/toolkit';
import {
    fetchGetUserData,
    fetchLogin,
    fetchRegistration,
} from './asyncActions';
import jwt_decode from 'jwt-decode'

const initialState = {
    userInfo: {},
    status: null // loading | success | error
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegistration.pending, (state, action) => {
            state.status = 'LOADING';
        });
        builder.addCase(fetchRegistration.fulfilled, (state, action) => {
            state.userInfo = action.payload
            console.log(action.payload)
            const username = jwt_decode(action.payload.token).username
            localStorage.setItem('username', username)
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchRegistration.rejected, (state, action) => {
            state.status = 'ERROR';
        });


        builder.addCase(fetchLogin.pending, (state, action) => {
            state.status = 'LOADING';
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            const username = jwt_decode(action.payload.token).username
            localStorage.setItem('username', username)
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.status = 'ERROR';
        });


        builder.addCase(fetchGetUserData.pending, (state, action) => {
            state.status = 'LOADING';
        });
        builder.addCase(fetchGetUserData.fulfilled, (state, action) => {
            state.userInfo = action.payload
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchGetUserData.rejected, (state, action) => {
            state.status = 'ERROR';
        });
    },
});

export const userActions  = userSlice.actions;

export default userSlice.reducer;