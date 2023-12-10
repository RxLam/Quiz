import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


export const fetchGetCategories = createAsyncThunk (
    'categories/fetchGetCategories',
        async () => {
            const { data } = await axios.get(`http://localhost:4000/categories`)
            return data;
        }
);

export const fetchGetCategoryByName = createAsyncThunk (
    'categories/fetchGetCategoryByName',
    async (name) => {
        const { data } = await axios.get(`http://localhost:4000/categories/` + name)
        return data;
    }
);

export const fetchGetCategoryById = createAsyncThunk (
    'categories/fetchGetCategoryByName',
    async (id) => {
        const { data } = await axios.get(`http://localhost:4000/categories/` + id)
        return data;
    }
);

export const fetchPostCategories = createAsyncThunk (
    'categories/fetchPostCategories',
    async (params) => {
        const { name, image } = params

        const { data } = await axios.post('http://localhost:4000/categories', {
            name,
            image
        })
            .then((response) => {
                console.log( `Категория ${response.data.name} добавлена`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);

export const fetchDeleteCategoryByName = createAsyncThunk (
    'categories/fetchDeleteCategoryByName',
    async (params) => {
        const { name } = params
        const { data } = await axios.delete('http://localhost:4000/categories/' + name, )
            .then((response) => {
                alert(`Категория ${response} удалена`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);

export const fetchDeleteAllCategories = createAsyncThunk (
    'categories/fetchDeleteAllCategories',
    async (params) => {
        const { data } = await axios.delete('http://localhost:4000/categories', )
            .then((response) => {
                alert(`Все категории удалены`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);

export const fetchDeleteCategoryById = createAsyncThunk (
    'categories/fetchDeleteCategories',
    async (params) => {
        const { id } = params

        const { data } = await axios.delete('http://localhost:4000/categories/' + id, )
            .then((response) => {
                alert(`Категория ${data} удалена`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);

export const fetchPutCategories = createAsyncThunk (
    'categories/update',
    async (params) => {
        const { id, name } = params

        const { data } = await axios.put('http://localhost:4000/categories', {
            id,
            name,
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        return data;
    }
);