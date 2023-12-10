import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../redux/store";
import {selectFilteredQuestions, selectQuestionsData} from "../redux/questions/selectors";
import {fetchGetQuestions} from "../redux/questions/asyncActions";


const QuestionsList = () => {
    const dispatch = useAppDispatch()
    const filteredQuestions = useSelector(selectFilteredQuestions)

    useEffect(() => {
        dispatch(fetchGetQuestions())
    }, [])

    return (
        <>
            <b>Questions:</b>
            {filteredQuestions?.map(question => {
                return <ul>{question.questions.map(q =>
                                <li>{q}</li>
                            )}
                        </ul>
            })}
        </>
    )
};

export default QuestionsList;