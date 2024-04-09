import { useEffect, useState } from "react"
import { quiz } from "../public/questions"
import Choices from './components/Choices'
import './components/quiz.css'
import Results from "./components/Results"

export default function Quiz() {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [clickedOption, setClickedOption] = useState(null)
    const [results, setResults] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    const [showResults, setShowResults] = useState(false)

    const { questions } = quiz
    const { question, choices, correctAnswer } = questions[activeQuestion]

    const handleNext = () => {
        clearInterval(timer)
        setClickedOption(null)
        if (activeQuestion === questions.length - 1) {
            setShowResults(true)
        } else {
            setActiveQuestion(prev => prev + 1)
        }
        setResults((prev) =>
            selectedAnswer ?
                {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1
                } :
                {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1
                }
        )

    }

    const handleClickedOption = (el) => {
        clearInterval(timer)
        setClickedOption(el)
        if (el === correctAnswer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }

    const handleRestart = () => {
        setActiveQuestion(0)
        setShowResults(false)
        setResults({
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
        })
    }
    const [timer, setTimer] = useState(15)
    useEffect(() => {
        if (showResults) return clearInterval(timer)
        setTimer(15)
        const myInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    handleNext()
                };
                return prevTimer - 1
            })
        }, 1000)
        return () => {
            clearInterval(myInterval)
        }
    }, [activeQuestion, showResults])

    const addZero = (number) => number > 9 ? number : `0${number}`
    return (
        showResults ? (
            <Results
                results={results}
                questionsLength={questions.length}
                handleRestart={handleRestart}
            />) :
            <div className="quiz-container">
                <div className="question-number">
                    <span className="active-question-no">{addZero(activeQuestion + 1)}</span>
                    <span className="question-number">/{addZero(questions.length)}</span>
                </div>
                <div className="timer" style={{ width: `${timer / 15 * 100}%` }}></div>
                <h2 className="question">{question}</h2>
                <Choices
                    choices={choices}
                    clickedOption={clickedOption}
                    handleClickedOption={handleClickedOption}
                />
                <p>{timer}</p>
                <button
                    disabled={!clickedOption}
                    onClick={handleNext}
                >
                    {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
    )
}