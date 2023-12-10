import React, {useEffect, useState} from 'react';
import { Input } from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {categoriesActions} from '../redux/categories/slice'
import {questionsActions} from "../redux/questions/slice";


const Search = () => {
    const dispatch = useDispatch()
    const [items, setItems] = useState('')

    const searchItems = (value) => {
        setItems(value)
    }

    useEffect(() => {
        dispatch(categoriesActions.searchByName(items))
        // dispatch(questionsActions.searchByName(items))
    }, [items, dispatch])

    return (
        <>
            <Input style={{width: '300'+'px'}} onChange={(e) => searchItems(e.target.value)} placeholder="Введите категорию" />
        </>
    )
}

export default Search