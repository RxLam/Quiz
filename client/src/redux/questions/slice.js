import { createSlice } from '@reduxjs/toolkit';
import {
    fetchGetQuestions,
    fetchPutQuestions,
    fetchGetQuestionByName,
    fetchDeleteQuestionsById,
    fetchDeleteAllQuestions
} from './asyncActions';


const initialState = {
    questions: [],
    filteredQuestions: [],
    status: 'LOADING' // loading | success | error
}

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestions(state, action) {
            state.questions = action.payload;
        },
        // подумать о целесообразности этого метода
        searchByName: (state, action) => {
            const filteredQuestions = state.questions.filter((question) => {
                return Object.values(question).join('').toLowerCase().includes(action.payload.toLowerCase())
            })
            return {
                ...state,
                filteredQuestions:
                    action.payload.length > 0 ? filteredQuestions: [...state.questions]
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetQuestions.pending, (state, action) => {
            state.status = 'LOADING';
            state.questions = [];
        });
        builder.addCase(fetchGetQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchGetQuestions.rejected, (state, action) => {
            state.status = 'ERROR';
            state.questions = [];
        });

        builder.addCase(fetchGetQuestionByName.pending, (state, action) => {
            state.status = 'LOADING';
            state.questions = [];
        });
        builder.addCase(fetchGetQuestionByName.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchGetQuestionByName.rejected, (state, action) => {
            state.status = 'ERROR';
            state.questions = [];
        });

        builder.addCase(fetchPutQuestions.pending, (state, action) => {
            state.status = 'LOADING';
            state.questions = [];
        });
        builder.addCase(fetchPutQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchPutQuestions.rejected, (state, action) => {
            state.status = 'ERROR';
            state.questions = [];
        });

        builder.addCase(fetchDeleteQuestionsById.pending, (state, action) => {
            state.status = 'LOADING';
            state.questions = [];
        });
        builder.addCase(fetchDeleteQuestionsById.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchDeleteQuestionsById.rejected, (state, action) => {
            state.status = 'ERROR';
            state.questions = [];
        });

        builder.addCase(fetchDeleteAllQuestions.pending, (state, action) => {
            state.status = 'LOADING';
            state.questions = [];
        });
        builder.addCase(fetchDeleteAllQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
            state.status = 'SUCCESS';
        });
        builder.addCase(fetchDeleteAllQuestions.rejected, (state, action) => {
            state.status = 'ERROR';
            state.questions = [];
        });
    },
});

export const questionsActions  = questionsSlice.actions;

export default questionsSlice.reducer;