import {useState} from 'react'
import './App.css'
import Intro from "./components/Intro.tsx"
import Quiz from "./components/Quiz.tsx"
import Outro from "./components/Outro.tsx"
import Confetti from "react-confetti"
import musicData from "./assets/indieRockSongs.json"

enum Page {
  INTRO = "INTRO",
  QUIZ = "QUIZ",
  OUTRO = "OUTRO"
}

export interface Answer {
  id: number;
  songName: string;
  isCorrect: boolean;
}

export interface MusicData {
  id: number;
  lyrics: string;
  answers: Answer[]
}

function getMusicData(): MusicData[] {
  return musicData;
}

function App() {
  const [currentPage, setCurrentPage] = useState(Page.INTRO)
  const [scoreState, setScoreState] = useState(0)

  const musicData = getMusicData()
  let content

  switch (currentPage) {
    case Page.INTRO:
      content = <Intro buttonClick={() => setCurrentPage(Page.QUIZ)}/>
      break
    case Page.QUIZ:
      content = <Quiz
        musicData={musicData}
        scoreState={scoreState}
        buttonClickFinish={() => setCurrentPage(Page.OUTRO)}
        setScoreState={setScoreState}
      />
      break
    case Page.OUTRO:
      content = <Outro
        scoreState={scoreState}
        buttonClickPlayAgain={() => {
          setScoreState(0)
          setCurrentPage(Page.QUIZ)
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
