export default function Genre({ buttonClick }: { buttonClick: () => void }) {
  return (
    <>
      <img className="genre-image" src="src/images/vinylDrawing.png" alt="Vinyl image"/>
      <h1 className="genre-message">
        Choose one category:
      </h1>
      <div className="genre-btn">
          <button className="btn-basic" onClick={buttonClick}>Indie Rock</button>
          <button className="btn-basic" onClick={buttonClick}>Pop Songs 2000s</button>
          <button className="btn-basic" onClick={buttonClick}>Pop punk</button>
          <button className="btn-basic" onClick={buttonClick}>Pop Songs 1990s</button>
      </div>
    </>
  )
}