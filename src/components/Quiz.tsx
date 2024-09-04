import {useEffect, useState} from "react";
import {Answer, MusicData} from "../App.tsx"
import AnswerButton from "./AnswerButton.tsx"


export default function Quiz({musicData, buttonClickFinish, scoreState, setScoreState}:
                               {
                                 musicData: MusicData[],
                                 scoreState: number,
                                 buttonClickFinish: () => void,
                                 setScoreState: (state: (prevState: number) => number) => void
                               }) {

  const [allQuestions, setAllQuestions] = useState(musicData)
  const [currentQuestion, setCurrentQuestion] = useState(() => getSelectedQuestion())
  const [answerState, setAnswerState] = useState(0)
  const [attemptsState, setAttemptsState] = useState(3)

  useEffect(() => {
    if (allQuestions.length > 0) {
      setCurrentQuestion(getSelectedQuestion())
    }
  }, [allQuestions])

  function getSelectedQuestion() {
    const randomNumber = Math.floor(Math.random() * allQuestions.length)
    return allQuestions[randomNumber]
  }

  function handleNextButtonClick() {
    if (allQuestions.length > 0) {
      setAllQuestions((prevState: MusicData[]) => prevState.filter(el => el.id !== currentQuestion.id))
      setAnswerState(0)
    }
    if (answerState === 0) {
      setAttemptsState(prevState => prevState - 1)
    }
    if (attemptsState === 0) {
      setAllQuestions([])
    }
  }
  const nextButton = <button className={`${answerState ? 'block' : 'hidden'} btn-next`}
                                  onClick={handleNextButtonClick}>NEXT</button>

  const finishButton = <button className="btn-basic"
                               onClick={buttonClickFinish}>FINISH</button>


  const finishElements = (
    <>
      <div className="finish-message">Wow! No more questions left! Press Finish to see your final score!</div>
    </>
  )
  const noAttemptsElements = (
    <>
      <img className="attempts-image" src="src/images/sad_cat.jpg" alt="Sad Cat Image"/>
      <div className="attempts-message">
        <div>Sadly no more attempts left!</div>
        <div>Press <span className="attempts-emphasized">FINISH</span> to see your final score: </div>
      </div>
    </>)
  const quizElements = (
    <>
      <div className="quiz-score">Current Score: {scoreState}</div>
      <div className="quiz-content">
            <div className="quiz-lyrics">Lyrics:</div>
            <div className="lyrics-current">{currentQuestion.lyrics}</div>
            <div className="quiz-answers">Answers:</div>
            <div className="answers-variants">{allQuestions.length ? currentQuestion.answers.map((answer: Answer) => {
              return <AnswerButton
                key={answer.id}
                answer={answer}
                answerState={answerState}
                setAnswerState={setAnswerState}
                setScoreState={setScoreState}
                setAttemptsState={setAttemptsState}/>
            }) : null}
            </div>
        {allQuestions.length && attemptsState ? nextButton : finishButton}
            <div className="attempts-message">Attempts left: {attemptsState}</div>
      </div>
    </>
  )
  let renderElements
  if (allQuestions.length > 0 && attemptsState > -1) {
    renderElements = quizElements
  } else if (!attemptsState) {
    renderElements = noAttemptsElements
  } else if (allQuestions.length < 1) {
    renderElements = finishElements
  }

  return (
    <>
      {renderElements}
    </>
  )
}
