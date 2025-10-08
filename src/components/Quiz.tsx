import {useEffect, useState} from "react";
import AnswerButton from "./AnswerButton.tsx"
import {Answer, MusicData} from "../types.ts"
import sadCat from "../images/sad_cat.jpg"

function getSelectedQuestion(allQuestions: MusicData[]): MusicData {
  const randomNumber = Math.floor(Math.random() * allQuestions.length)
  return allQuestions[randomNumber]
}

export default function Quiz({musicData, buttonClickFinish, scoreState, setScoreState}:
                               {
                                 musicData: MusicData[],
                                 scoreState: number,
                                 setScoreState: (state: (prevState: number) => number) => void,
                                 buttonClickFinish: () => void,
                               }) {

  const [allQuestions, setAllQuestions] = useState(musicData)
  const [currentQuestion, setCurrentQuestion] = useState(() => getSelectedQuestion(musicData))
  const [answeredId, setAnsweredId] = useState(0)
  const [attemptsState, setAttemptsState] = useState(3)

  useEffect(() => {
    if (allQuestions.length > 0) {
      setCurrentQuestion(getSelectedQuestion(allQuestions))
    }
  }, [allQuestions])

  function handleNextButtonClick(): void {
    if (answeredId === 0) {
      // skipping the question without answering
      if (attemptsState === 1) {
        // skipping with the last attempt
        setAttemptsState((prevState: number) => prevState - 1)
      } else if (attemptsState > 1) {
        // skipping with more than 1 attempt
        setAttemptsState((prevState: number) => prevState - 1)
        goToNextQuestion()
      }
    } else if (allQuestions.length > 0) {
      // some questions left
      goToNextQuestion()
    }
  }

  function goToNextQuestion() {
    setAllQuestions((prevState: MusicData[]) => prevState.filter(el => el.id !== currentQuestion.id))
    setAnsweredId(0)
  }

  function handleAnswerButtonClick(answer: Answer): void {
    setAnsweredId(answer.id)
    if (answer.isCorrect) {
      setScoreState(prevState => prevState + 1)
    } else {
      setAttemptsState(prevState => prevState - 1)
    }
  }

  const renderNextButton = <button className={`${answeredId ? 'block' : 'hidden'} btn-next`}
                             onClick={handleNextButtonClick}>NEXT</button>

  const renderFinishButton = <button className="btn-basic"
                               onClick={buttonClickFinish}>FINISH</button>

  const renderFinishElements = (
    <>
      <div className="finish-message">Wow! No more questions left! Press<span
        className="finish-emphasized">FINISH</span>
        to see your final score!
      </div>
      {renderFinishButton}
    </>
  )

  const skippedLastQuestion = attemptsState === 0 && answeredId === 0
  const hasAttemptsLeft = attemptsState > 0
  const hasQuestionsLeft = allQuestions.length > 0

  const renderQuizContent = (
    <>
      <div className="quiz-lyrics">Lyrics:</div>
      <div className="lyrics-current">{currentQuestion.lyrics}</div>
      <div className="answers-variants">
        {allQuestions.length && currentQuestion.answers.map((answer: Answer) => {
          return <AnswerButton
            key={answer.id}
            answer={answer}
            clickedAnsweredId={answeredId}
            handleAnswerButtonClick={() => handleAnswerButtonClick(answer)}
          />
        })}
      </div>
    </>
  )

  const renderSkippedAttemptsImage = (
    <>
      <img className="skipped-attempts-img" src={sadCat} alt="The picture of a sad cat"/>
    </>
  )

  const renderAttemptsMessage = (
    <>
      <div className="attempts-message">Attempts left: {attemptsState}</div>
      {renderNextButton}
    </>
  )

  const renderNoAttemptsMessage = (
    <>
      <div className="attempts-message">
        <div className="attempts-finish">Sadly no more attempts left!</div>
        <div>Press <span className="finish-emphasized">FINISH</span> to see your final score</div>
      </div>
      {renderFinishButton}
    </>
  )

  return (
    <>
      {
          hasQuestionsLeft ? (
          <>
            <div className="quiz-score"
                 style={{visibility: hasAttemptsLeft ? 'visible' : 'hidden'}}>
              Current Score: {scoreState}
            </div>
            <div className="quiz-content">
              {skippedLastQuestion ? renderSkippedAttemptsImage : renderQuizContent}
              {hasAttemptsLeft ? renderAttemptsMessage : renderNoAttemptsMessage}
            </div>
          </>
        ) : (
            renderFinishElements
          )
      }
    </>
  )
}
