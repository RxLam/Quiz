import { createAsyncThunk } from '@reduxjs/toolkit';
import {API_URL} from "../../consts";
import axios from 'axios'



export const fetchGetQuestions = createAsyncThunk (
    'questions/fetchGetQuestions',
        async () => {
            const { data } = await axios.get(`${API_URL}questions`)
            return data;
        }
);

export const fetchGetQuestionByName = createAsyncThunk (
    'categories/fetchGetQuestionByName',
    async (name) => {
        const { data } = await axios.get(`${API_URL}questions/` + name)
        return data;
    }
);

export const fetchPostQuestions = createAsyncThunk (
    'questions/fetchPostQuestions',
    async (params) => {
        const { categoryId, questions } = params

        const { data } = await axios.post(`${API_URL}questions`, {
            categoryId,
            questions: [questions]
        })
            .then((response) => {
                console.log( `Вопрос ${response.data.questions} добавлен`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);

export const fetchPutQuestions = createAsyncThunk (
    'questions/update',
    async (params) => {
        const { categoryId, questions } = params
        console.log(params)
        const { data } = await axios.put(`${API_URL}questions` , {
            id: categoryId,
            questions: questions
        })
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert(error);
            });
        return data;
    }
);

export const fetchDeleteQuestionByName = createAsyncThunk (
    'questions/fetchDeleteQuestionByName',
    async (params) => {
        const { name } = params

        const { data } = await axios.delete(`${API_URL}questions/` + name, )
            .then((response) => {
                console.log(`Вопрос: ${name} удален`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);

export const fetchDeleteAllQuestions = createAsyncThunk (
    'questions/fetchDeleteAllQuestions',
    async () => {
        const { data } = await axios.delete(`${API_URL}questions` )
            .then((response) => {
                console.log(`Все вопросы удалены`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
)

export const fetchDeleteQuestionsById = createAsyncThunk (
    'questions/fetchDeleteQuestionsById',
    async (params) => {
        const { id } = params
        console.log(id)
        const { data } = await axios.delete(`${API_URL}questions/` + id)
            .then((response) => {
                alert(`Вопросы категории ${response} удалены`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);