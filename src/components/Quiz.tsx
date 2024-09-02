import {useEffect, useState} from "react";
import {Answer, MusicData} from "../App.tsx"
import AnswerButton from "./AnswerButton.tsx";


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
  //const [scoreState, setScoreState] = useState(0)

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
    console.log("handleNextButtonClick: ")
    if (allQuestions.length > 0) {
      setAllQuestions((prevState: MusicData[]) => prevState.filter(el => el.id !== currentQuestion.id))
      setAnswerState(0)
    }
  }

  const nextButton = <button className={`${answerState ? 'block' : 'hidden'} btn-next`}
                             onClick={handleNextButtonClick}>NEXT</button>
  const finishButton = <button className="btn-basic" onClick={buttonClickFinish}>FINISH</button>

  const finishElements = (
    <>
      <div className="finish-message">No more questions left!</div>
      {finishButton}
    </>
  )

  const quizElements = (
    <>
      <div className="quiz-score">Current Score: {scoreState}</div>
      <div className="quiz-content">
        <div className="quiz-lyrics">Lyrics:</div>
        <div className="lyrics-current">{currentQuestion.lyrics}</div>
        <div className="quiz-answers">Answers:</div>
        <div className="answers-variants">{allQuestions.length ? currentQuestion.answers.map((answer: Answer) => {
          return <AnswerButton answer={answer}
                               answerState={answerState}
                               setAnswerState={setAnswerState}
                               setScoreState={setScoreState}/>
        }) : null}
        </div>
        {nextButton}
      </div>
    </>
  )

  return (
    <>
      {allQuestions.length ? quizElements : finishElements}
    </>
  )
}