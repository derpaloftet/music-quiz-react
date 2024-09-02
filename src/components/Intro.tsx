
export default function Intro({ buttonClick }: { buttonClick: () => void }) {
  return (
    <>
        <img className="main-image" src="src/images/vinylDrawing.png" alt="Vinyl image"/>
        <h1 className="intro-header">
            <span>Welcome to </span>
            <span className="intro-emphasized">Music Quiz!</span>
        </h1>
        <button className="btn-basic" onClick={buttonClick}>START</button>
    </>
  )
}