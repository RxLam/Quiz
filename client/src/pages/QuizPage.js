import React, {useState} from "react";
import QuizItem from "../components/QuizItem";
import {Navigate, useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectQuestionsData} from "../redux/questions/selectors";
import { Progress } from 'antd';


const QuizPage = () => {
    let { id } = useParams()

    const [step, setStep] = useState(0)
    const [matches, setMatch] = useState(0)

    const { questions } = useSelector(selectQuestionsData)
    if (questions.length === 0) return <Navigate to="/"/>

    const findQuestionsById = (id) => {
        const items = questions.find(question => question.categoryId === Number(id))
        return items
    }

    const currentQuestions = findQuestionsById(id)
    const allSteps = currentQuestions.questions.length
    const percent = Math.round(step/allSteps*100)

    const checkAnswear = (index) => {
        return index === currentQuestions.variants[step].correct
    }

    const onClickVariant = (index) => {
        if (checkAnswear(index)) {
            setMatch(prev => prev + 1)
        }
        setStep(prevStep => prevStep + 1)
    }

    return (
        <>
            <Progress style={{marginLeft: 25}} percent={percent} steps={allSteps} />
            <QuizItem currentQuestions={currentQuestions} matches={matches} step={step} onClickVariant={onClickVariant}/>
        </>
    )
}

export default QuizPage