import { createSlice } from '@reduxjs/toolkit';
import { fetchGetCategories, fetchGetCategoryByName, fetchDeleteCategoryByName } from './asyncActions';


const initialState = {
    categories: [],
    filteredCategories: [],
    status: 'LOADING' // loading | success | error
}


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        },

        searchByName: (state, action) => {
            const filteredCategories = state.categories.filter((category) => {
                return Object.values(category).join('').toLowerCase().includes(action.payload.toLowerCase())
            })
            return {
                ...state,
                filteredCategories:
                    action.payload.length > 0 ? filteredCategories: [...state.categories]
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetCategories.pending, (state, action) => {
            state.status = 'LOADING';
            state.categories = [];
            state.filteredCategories = []
        });

        builder.addCase(fetchGetCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.filteredCategories = [...action.payload];
            state.status = 'SUCCESS';
        });

        builder.addCase(fetchGetCategories.rejected, (state, action) => {
            state.status = 'ERROR';
            state.categories = [];
            state.filteredCategories = []
        });

        builder.addCase(fetchGetCategoryByName.pending, (state, action) => {
            state.status = 'LOADING';
            state.categories = [];
        });

        builder.addCase(fetchGetCategoryByName.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.status = 'SUCCESS';
        });

        builder.addCase(fetchGetCategoryByName.rejected, (state, action) => {
            state.status = 'ERROR';
            state.categories = [];
        });

        builder.addCase(fetchDeleteCategoryByName.pending, (state, action) => {
            state.status = 'LOADING';
            state.categories = [];
        });

        builder.addCase(fetchDeleteCategoryByName.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.status = 'SUCCESS';
        });

        builder.addCase(fetchDeleteCategoryByName.rejected, (state, action) => {
            state.status = 'ERROR';
            state.categories = [];
        });
    },
});

export const categoriesActions  = categoriesSlice.actions;

export default categoriesSlice.reducer;