import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../redux/store";
import {selectVariantsData} from "../redux/variants/selectors";
import {fetchGetVariants} from "../redux/variants/asyncActions";


const VariantsList = () => {
    const dispatch = useAppDispatch()
    const { variants } = useSelector(selectVariantsData)

    useEffect(() => {
        dispatch(fetchGetVariants())
    }, [])

    return (
        <>
            <b>variants:</b>
            {variants?.map(variant => {
                return <li>{variant.variants.join(' ')}</li>
            })}
        </>
    )
};

export default VariantsList;