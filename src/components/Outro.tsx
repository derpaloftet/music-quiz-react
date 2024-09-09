export default function Outro({scoreState, buttonClickPlayAgain}: {
  scoreState: number,
  buttonClickPlayAgain: () => void
}) {
  return (
    <>
      <img className="main-image" src="src/images/vinylDrawing.png" alt="Vinyl image"/>
      <h1 className="outro-header">
        <span>You've finished</span>
        <span>the quiz!</span>
      </h1>
      <div className="outro-message">Your Final Score: {scoreState}</div>
      <button className="btn-basic" onClick={buttonClickPlayAgain}>PLAY AGAIN</button>
    </>
  )
}