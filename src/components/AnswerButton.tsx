import {Answer} from "../types.ts";

export default function AnswerButton({answeredId, answer, handleAnswerButtonClick}:
                                       {
                                         answeredId: number,
                                         answer: Answer,
                                         handleAnswerButtonClick: () => void
                                       }) {

  let classNameColor: string;
  if (!answeredId) {
    // nothing is clicked
    classNameColor = "answer-default";
  } else if (answeredId === answer.id) {
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
                 disabled={answeredId !== 0}
                 onClick={handleAnswerButtonClick}
  >
    {answer.songName}
  </button>
}