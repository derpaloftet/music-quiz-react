import {GenreKeys} from "../types.ts"

interface GenreProps {
  buttonGenreClick: (genre: GenreKeys) => void;
}

export default function ({ buttonGenreClick }: GenreProps) {

  return (
    <>
      <img className="genre-image" src="src/images/vinylDrawing.png" alt="Vinyl image"/>
      <h1 className="genre-message">
        Choose a category:
      </h1>
      <div className="genre-btn">
          <button className="btn-basic" onClick={()=>buttonGenreClick("indieRock")} id="indieRock">Indie Rock</button>
          <button className="btn-basic" onClick={()=>buttonGenreClick("pop2000")} id="pop2000">Pop Songs 2000s</button>
          <button className="btn-basic" onClick={()=>buttonGenreClick("popPunk")} id="popPunk">Pop Punk</button>
          <button className="btn-basic" onClick={()=>buttonGenreClick("pop1990")} id="pop1990">Pop Songs 1990s</button>
      </div>
    </>
  )
}