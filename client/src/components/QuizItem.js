import React from "react"
import Result from "./Result"

const QuizItem = ({currentQuestions, matches, step, onClickVariant}) => {

    return (
        <>
            <div className='quiz'>
                {step < currentQuestions.questions.length ?
                    <>
                        <h1>{currentQuestions.questions[step]}</h1>
                        <ul>
                            {currentQuestions.variants[step].variants.map((question, index) => {
                                return <li className='question' onClick={() => onClickVariant(index)}
                                           key={index}>{question}</li>
                            })}
                        </ul>
                    </> : <Result matches={matches} total={currentQuestions.questions.length} />
                }
            </div>
        </>
    )
}

export default QuizItem