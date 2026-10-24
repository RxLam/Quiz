import { createAsyncThunk } from '@reduxjs/toolkit';
import {API_URL} from "../../consts";
import axios from 'axios'


export const fetchRegistration = createAsyncThunk (
    'user/fetchRegistration',
        async ({username, password, email, birthDate}) => {
        console.log('regData', username)
            const { data } = await axios.post(`${API_URL}user/registration`, {
                username,
                password,
                email,
                birthDate
            }).catch((error) => { alert( `Произошла ошибка ${error.response.data.message}`)});
            return data
        }
);

export const fetchLogin = createAsyncThunk (
    'user/fetchLogin',
    async ({username, password}) => {
        const { data } = await axios.post(`${API_URL}user/login`, {
            username,
            password
        }).catch((error) => alert( `Произошла ошибка ${error.response.data.message}`))
        return data
    }
);


export const fetchGetUserData = createAsyncThunk (
    'user/fetchGetUserData',
    async ({username}) => {
        const { data } = await axios.get(`${API_URL}user/` + username).catch((error) => { alert( `Произошла ошибка ${error.response.data.message}`)});
        console.log(data)
        return data
    }
);


export const fetchAddScores = createAsyncThunk (
    'user/fetchGetUserData',
    async ({username, scores}) => {
        console.log('addScoresData', username, scores)
        const { data } = await axios.post(`${API_URL}user/addScores`, {
            username,
            scores
        }).catch((error) => { alert( `Произошла ошибка ${error.response.data.message}`)});
        return data
    }
);

export const fetchDeleteScores = createAsyncThunk (
    'user/fetchGetUserData',
    async ({username}) => {
        console.log('deleteScoresData', username)
        const { data } = await axios.put(`${API_URL}user/deleteScores`, {
            username
        }).catch((error) => { alert( `Произошла ошибка ${error.response.data.message}`)});
        return data
    }
);