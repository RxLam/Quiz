import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


export const fetchGetVariants = createAsyncThunk (
    'variants/fetchGetVariants',
        async () => {
            const { data } = await axios.get(`http://localhost:4000/variants`)
            return data;
        }
);

export const fetchPostVariants = createAsyncThunk (
    'variants/fetchPostVariants',
    async (params) => {
        const { questionId ,variants, correct } = params

        const { data } = await axios.post('http://localhost:4000/variants', {
            questionId,
            variants: variants.split(', '),
            correct,
        })
            .then((response) => {
                console.log( `Варианты ${response.data.variants} добавлены`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);

export const fetchDelVariantsByRange = createAsyncThunk (
    'variants/fetchDeleteVariantsByRange',
    async (params) => {
        const { id , from, to } = params

        const { data } = await axios.put('http://localhost:4000/variants/' + id, {
                from,
                to
            }).then((response) => {
                console.log(`${response.data} Варианты c id: ${from} до id: ${to} удалены`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);

export const fetchDeleteAllVariants = createAsyncThunk (
    'variants/fetchDeleteAllVariants',
    async () => {
        const { data } = await axios.delete('http://localhost:4000/variants' )
            .then((response) => {
                console.log(`Все варианты удалены`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
)

export const fetchAddVariants = createAsyncThunk (
    'variants/addVariants',
    async (params) => {
        const { id, variants} = params

        const { data } = await axios.put('http://localhost:4000/variants', {
            id,
            variants: variants.split(', ')
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

export const fetchDeleteVariantsById = createAsyncThunk (
    'questions/fetchDeleteVariantsById',
    async (params) => {
        const { id } = params
        console.log(id)
        const { data } = await axios.delete('http://localhost:4000/variants/' + id)
            .then((response) => {
                alert(`Варианты вопроса ${response} удалены`);
            })
            .catch((error) => {
                alert( `Произошла ошибка ${error}`);
            });
        return data;
    }
);