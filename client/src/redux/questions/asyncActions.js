import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


export const fetchGetQuestions = createAsyncThunk (
    'questions/fetchGetQuestions',
        async () => {
            const { data } = await axios.get(`http://localhost:4000/questions`)
            return data;
        }
);

export const fetchGetQuestionByName = createAsyncThunk (
    'categories/fetchGetQuestionByName',
    async (name) => {
        const { data } = await axios.get(`http://localhost:4000/questions/` + name)
        return data;
    }
);

export const fetchPostQuestions = createAsyncThunk (
    'questions/fetchPostQuestions',
    async (params) => {
        const { categoryId, questions } = params

        const { data } = await axios.post('http://localhost:4000/questions', {
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
        const { data } = await axios.put('http://localhost:4000/questions' , {
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

        const { data } = await axios.delete('http://localhost:4000/questions/' + name, )
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
        const { data } = await axios.delete('http://localhost:4000/questions' )
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
        const { data } = await axios.delete('http://localhost:4000/questions/' + id)
            .then((response) => {
                alert(`Вопросы категории ${response} удалены`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);