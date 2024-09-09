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

  function handleAnswerButtonClick(answer: Answer) {
    setAnswerState(answer.id)
    if (answer.isCorrect) {
      setScoreState(prevState => prevState + 1)
    } else if (!answer.isCorrect) {
      setAttemptsState(prevState => prevState - 1)
    }
  }

  const nextButton = <button className={`${answerState ? 'block' : 'hidden'} btn-next`}
                                  onClick={handleNextButtonClick}>NEXT</button>

  const finishButton = <button className="btn-basic"
                               onClick={buttonClickFinish}>FINISH</button>


  const finishElements = (
    <>
      <div className="finish-message">Wow! No more questions left! Press<span className="finish-emphasized">FINISH</span>
        to see your final score!
      </div>
      {finishButton}
    </>
  )
  const quizElements = (
    <>
    <div style={attemptsState === 0 ? { visibility: 'hidden' } : {visibility: "visible"}}
         className="quiz-score">Current Score: {scoreState}</div>
      <div className="quiz-content">

            <div className="quiz-lyrics">Lyrics:</div>
            <div className="lyrics-current">{currentQuestion.lyrics}</div>
            <div className="quiz-answers">Answers:</div>
            <div className="answers-variants">
              {allQuestions.length && currentQuestion.answers.map((answer: Answer) => {

              return <AnswerButton
                key={answer.id}
                answer={answer}
                answerState={answerState}
                handleAnswerButtonClick={()=>handleAnswerButtonClick(answer)}
              />
            })}
            </div>
        {allQuestions.length && attemptsState ? nextButton : finishButton}
        {allQuestions.length && attemptsState ? <div className="attempts-message">Attempts left: {attemptsState}</div> :
          <div className="attempts-message">
            <div>Sadly no more attempts left!</div>
            <div>Press <span className="finish-emphasized">FINISH</span> to see your final score</div>
          </div>
      }
      </div>
    </>
  )
  return (
      <>
        {allQuestions.length > 0 ? quizElements : finishElements}
      </>
      )
  }




