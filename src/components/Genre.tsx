import {GenreKeys} from "../types.ts"

interface GenreProps {
  buttonClickGenre: (genre: GenreKeys) => void;
}

export default function Genre({ buttonClickGenre }: GenreProps) {

  return (
    <>
      <img className="genre-image" src="vinylDrawing.webp" alt="Vinyl image"/>
      <h1 className="genre-message">
        Choose a category:
      </h1>
      <div className="genre-btn">
        <button className="btn-basic" onClick={() => buttonClickGenre("indieRock")} id="indieRock">Indie Rock</button>
        <button className="btn-basic" onClick={() => buttonClickGenre("pop2000")} id="pop2000">Pop Songs 2000s</button>
        <button className="btn-basic" onClick={() => buttonClickGenre("popPunk")} id="popPunk">Pop Punk</button>
        <button className="btn-basic" onClick={() => buttonClickGenre("pop1990")} id="pop1990">Pop Songs 1990s</button>
      </div>
    </>
  )
}