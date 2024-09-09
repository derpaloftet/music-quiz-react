import {useState} from 'react'
import './App.css'
import Intro from "./components/Intro.tsx"
import Quiz from "./components/Quiz.tsx"
import Outro from "./components/Outro.tsx"
import Genre from "./components/Genre.tsx";
import Confetti from "react-confetti"
import {GenreKeys, MusicData} from "./types.ts";

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

  const dataPath: Record<GenreKeys, string> = {
    indieRock: "./src/assets/indieRockSongs.json",
    pop2000: "./src/assets/pop2000Songs.json",
    popPunk: "./src/assets/popPunkSongs.json",
    pop1990: "./src/assets/pop1990Songs.json",
  }

  async function handleButtonGenreClick(genre: GenreKeys): Promise<void> {
    const genreUrl = dataPath[genre]
    try {
      const response = await fetch(genreUrl)
      const result = await response.json() as MusicData[]
      setMusicData(result)
      setCurrentPage(Page.QUIZ)
    } catch (error) {
      console.error("Error fetching music data:", error)
    }
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
