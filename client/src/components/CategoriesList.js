import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../redux/store";
import {selectFilteredCategories} from "../redux/categories/selectors";
import {fetchGetCategories} from "../redux/categories/asyncActions";



const CategoriesList = () => {
    const dispatch = useAppDispatch()
    const filteredCategories = useSelector(selectFilteredCategories)

    useEffect(() => {
            dispatch(fetchGetCategories())
    }, [dispatch])

    return (
            <>
                <b>Categories:</b>
                {filteredCategories?.map(category => {
                    return  <div key={category.id}>
                                <li>{category.name}</li>
                                <lebel>questions:</lebel>
                                <li style={{listStyleType: 'none'}}>{category.questions[0]?.questions.toLocaleString('')}</li>
                                <hr style={{marginLeft: 0, width: 200}}/>
                            </div>

                })}
            </>
    )
};

export default CategoriesList;