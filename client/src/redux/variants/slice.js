import { createSlice } from '@reduxjs/toolkit';
import {
    fetchGetVariants,
    fetchPostVariants,
    fetchDeleteAllVariants,
    fetchDelVariantsByRange,
    fetchDeleteVariantsById
} from './asyncActions';
import {useSelector} from "react-redux";
import {selectQuestionsData} from "../questions/selectors";

const initialState = {
    variants: [],
    status: 'LOADING' // loading | success | error
}


const variantsSlice = createSlice({
    name: 'variants',
    initialState,
    reducers: {
        setItems(state, action) {
            state.variants = action.payload;
        },
        calcVarId(state, action) {
            // получаем вопросы до текущего
            console.log('action', action.payload.questions, action.payload.id)
            console.log(state.variants)
            const arr = action.payload.questions.slice()
            const firstIndex = arr[0].id
            console.log('arrQuestions', arr, 'index', action.payload.id-firstIndex)
            // отнимем текущий индекс и первый что бы нивелировать разницу относительно постоянно возрастающих индексов из таблицы БД
            const delta = +action.payload.id-+firstIndex
            console.log(delta)
            if (state.variants[state.variants.length-1].hasOwnProperty("varId")) return
            if (delta === 0) {
                state.variants.push({varId: 0})
            } else {
                arr.splice(delta)
                // складываем все вопросы до текущего, это будет индекс текущих вариантов ответа
                const indexCurrentVariants = arr.reduce((acc, cur) => acc + cur.questions.length, 0)
                state.variants.push({varId: indexCurrentVariants})
                console.log('stateVariants', state.variants)
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetVariants.pending, (state, action) => {
            state.status = 'LOADING';
            state.variants = [];
        });
        builder.addCase(fetchGetVariants.fulfilled, (state, action) => {
            state.variants = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchGetVariants.rejected, (state, action) => {
            state.status = 'ERROR';
            state.variants = [];
        });

        builder.addCase(fetchPostVariants.pending, (state, action) => {
            state.status = 'LOADING';
            state.variants = [];
        });
        builder.addCase(fetchPostVariants.fulfilled, (state, action) => {
            state.variants = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchPostVariants.rejected, (state, action) => {
            state.status = 'ERROR';
            state.variants = [];
        });

        builder.addCase(fetchDeleteAllVariants.pending, (state, action) => {
            state.status = 'LOADING';
            state.variants = [];
        });
        builder.addCase(fetchDeleteAllVariants.fulfilled, (state, action) => {
            state.variants = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchDeleteAllVariants.rejected, (state, action) => {
            state.status = 'ERROR';
            state.variants = [];
        });

        builder.addCase(fetchDelVariantsByRange.pending, (state, action) => {
            state.status = 'LOADING';
            state.variants = [];
        });
        builder.addCase(fetchDelVariantsByRange.fulfilled, (state, action) => {
            state.variants = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchDelVariantsByRange.rejected, (state, action) => {
            state.status = 'ERROR';
            state.variants = [];
        });

        builder.addCase(fetchDeleteVariantsById.pending, (state, action) => {
            state.status = 'LOADING';
            state.variants = [];
        });
        builder.addCase(fetchDeleteVariantsById.fulfilled, (state, action) => {
            state.variants = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchDeleteVariantsById.rejected, (state, action) => {
            state.status = 'ERROR';
            state.variants = [];
        });
    },
});


export const { setItems } = variantsSlice.actions;
export const { calcVarId } = variantsSlice.actions;
export default variantsSlice.reducer;