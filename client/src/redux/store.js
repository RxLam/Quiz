import { configureStore } from '@reduxjs/toolkit';
import categories  from './categories/slice';
import questions from './questions/slice'
import user from './user/slice'
import variants from './variants/slice'
import { useDispatch } from 'react-redux';


export const store = configureStore({
    reducer: {
        categories,
        questions,
        variants,
        user
    },
});

export const useAppDispatch = () => useDispatch();