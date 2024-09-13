import {useState} from 'react'
import './App.css'
import Intro from "./components/Intro.tsx"
import Quiz from "./components/Quiz.tsx"
import Outro from "./components/Outro.tsx"
import Genre from "./components/Genre.tsx"
import Confetti from "react-confetti"
import {GenreKeys, MusicData} from "./types.ts"
import indieRock from "./assets/indieRockSongs.json"
import pop2000 from "./assets/pop2000Songs.json"
import popPunk from "./assets/popPunkSongs.json"
import pop1990 from "./assets/pop1990Songs.json"

enum Page {
  INTRO = "INTRO",
  GENRE = "GENRE",
  QUIZ = "QUIZ",
  OUTRO = "OUTRO"
}

function App() {
  const [currentPage, setCurrentPage] = useState(Page.INTRO)
  const [scoreState, setScoreState] = useState(0)
  const [musicData, setMusicData] = useState([] as MusicData[])

  const dataPath: Record<GenreKeys, MusicData[]> = {
    indieRock: indieRock,
    pop2000: pop2000,
    popPunk: popPunk,
    pop1990: pop1990,
  }

  function handleButtonGenreClick(genre: GenreKeys): void {
    const result = dataPath[genre]
    setMusicData(result)
    setCurrentPage(Page.QUIZ)
  }

  let content

  switch (currentPage) {
    case Page.INTRO:
      content = <Intro buttonClickStart={() => setCurrentPage(Page.GENRE)}/>
      break
    case Page.GENRE:
      content = <Genre buttonClickGenre={handleButtonGenreClick}/>
      break
    case Page.QUIZ:
      content = <Quiz
        musicData={musicData}
        scoreState={scoreState}
        setScoreState={setScoreState}
        buttonClickFinish={() => setCurrentPage(Page.OUTRO)}
      />
      break
    case Page.OUTRO:
      content = <Outro
        scoreState={scoreState}
        buttonClickPlayAgain={() => {
          setScoreState(0)
          setCurrentPage(Page.GENRE)
        }}
      />
  }

  return (
    <>
      {currentPage === Page.OUTRO && <Confetti/>}
      <div className={"main--content"}>
        {content}
      </div>
    </>
  )
}

export default App
