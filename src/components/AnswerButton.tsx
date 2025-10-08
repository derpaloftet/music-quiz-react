import {Answer} from "../types.ts";

export default function AnswerButton({clickedAnsweredId, answer, handleAnswerButtonClick}:
                                       {
                                         clickedAnsweredId: number,
                                         answer: Answer,
                                         handleAnswerButtonClick: () => void
                                       }) {

  let classNameColor: string;
  if (!clickedAnsweredId) {
    // nothing is clicked
    classNameColor = "answer-default";
  } else if (clickedAnsweredId === answer.id) {
    // clicked button
    classNameColor = answer.isCorrect ? "answer-correct" : "answer-wrong";
  } else {
    // not clicked buttons
    classNameColor = answer.isCorrect ? "answer-correct" : "answer-default";
  }

  return <button key={answer.id}
                 className={`btn-answer ${classNameColor}`}
                 disabled={clickedAnsweredId !== 0}
                 onClick={handleAnswerButtonClick}
  >
    {answer.songName}
  </button>
}