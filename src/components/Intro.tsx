export default function Intro({buttonClickStart}: { buttonClickStart: () => void }) {
  return (
    <>
      <img className="main-image" src="vinylDrawing.png" alt="Vinyl image"/>
      <h1 className="intro-header">
        <span>Welcome to </span>
        <span className="intro-emphasized">Music Quiz!</span>
      </h1>
      <button className="btn-basic" onClick={buttonClickStart}>START</button>
    </>
  )
}