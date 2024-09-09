import {Answer} from "../App.tsx";

export default function AnswerButton({answerState, answer, handleAnswerButtonClick}:
                                       {
                                         answerState: number,
                                         answer: Answer,
                                         handleAnswerButtonClick: ()=> void
                                       }) {

  let classNameColor: string;
  if (!answerState) {
    // nothing is clicked
    classNameColor = "answer-default";
  } else if (answerState === answer.id) {
    // clicked button
    if (answer.isCorrect) {
      classNameColor = "answer-correct";
    } else {
      classNameColor = "answer-wrong";
    }
  } else {
    // unclicked buttons
    if (answer.isCorrect) {
      classNameColor = "answer-correct";
    } else {
      classNameColor = "answer-default";
    }
  }

  return <button key={answer.id}
                 className={`btn-answer ${classNameColor}`}
                 disabled={answerState !== 0}
                 onClick={handleAnswerButtonClick}
  >
    {answer.songName}
  </button>
}