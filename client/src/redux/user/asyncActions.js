import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const showRequestError = (error) => {
    const responseMessage = error.response?.data?.message;
    const message = Array.isArray(responseMessage)
        ? responseMessage.join(', ')
        : responseMessage || error.message || 'Не удалось выполнить запрос';
    alert(`Произошла ошибка: ${message}`);
    throw error;
}

export const fetchRegistration = createAsyncThunk (
    'user/fetchRegistration',
        async ({username, password, email, birthDate}) => {
        console.log('regData', username)
            const { data } = await axios.post(`http://localhost:4000/user/registration`, {
                username,
                password,
                email,
                birthDate
            }).catch(showRequestError);
            return data
        }
);

export const fetchLogin = createAsyncThunk (
    'user/fetchLogin',
    async ({username, password}) => {
        const { data } = await axios.post(`http://localhost:4000/user/login`, {
            username,
            password
        }).catch(showRequestError)
        return data
    }
);


export const fetchGetUserData = createAsyncThunk (
    'user/fetchGetUserData',
    async () => {
        const { data } = await axios.get(`http://localhost:4000/user/me`).catch((error) => { alert( `Произошла ошибка ${error.response.data.message}`)});
        console.log(data)
        return data
    }
);


export const fetchAddScores = createAsyncThunk (
    'user/fetchAddScores',
    async ({scores}) => {
        const { data } = await axios.post(`http://localhost:4000/user/addScores`, {
            scores
        }).catch((error) => { alert( `Произошла ошибка ${error.response.data.message}`)});
        return data
    }
);

export const fetchDeleteScores = createAsyncThunk (
    'user/fetchDeleteScores',
    async () => {
        const { data } = await axios.put(`http://localhost:4000/user/deleteScores`, {})
            .catch((error) => { alert( `Произошла ошибка ${error.response.data.message}`)});
        return data
    }
);
