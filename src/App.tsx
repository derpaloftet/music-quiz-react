import {useState} from 'react'
import './App.css'
import Intro from "./components/Intro.tsx"
import Quiz from "./components/Quiz.tsx"
import Outro from "./components/Outro.tsx"
import Confetti from "react-confetti";

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
  return [
    {
      id: 11,
      lyrics: "1. Lorem Lorem Lorem Lorem Lorem Lorem Lorem Ipsum Ipsum Ipsum Ipsum Ipsum",
      answers: [
        {
          id: 1,
          songName: "Lorem Ipsum",
          isCorrect: false,
        },
        {
          id: 2,
          songName: "Lorem",
          isCorrect: false,
        },
        {
          id: 3,
          songName: "Ipsum",
          isCorrect: true,
        },
        {
          id: 4,
          songName: "Lorem Lorem",
          isCorrect: false,
        },
      ]
    },
    {
      id: 22,
      lyrics: "2. Ipsum",
      answers: [
        {
          id: 1,
          songName: "Lor Ips",
          isCorrect: true,
        },
        {
          id: 2,
          songName: "Ipsum",
          isCorrect: false,
        },
        {
          id: 3,
          songName: "Lor",
          isCorrect: false,
        },
        {
          id: 4,
          songName: "Lorem Lorem",
          isCorrect: false,
        },
      ]
    },
    {
      id: 33,
      lyrics: "3. Lorem Lorem Lorem Ipsum",
      answers: [
        {
          id: 1,
          songName: "Lorem Ipsum",
          isCorrect: false,
        },
        {
          id: 2,
          songName: "Ipsum Ipsum Ipsum",
          isCorrect: false,
        },
        {
          id: 3,
          songName: "Lorem Ipsum",
          isCorrect: true,
        },
        {
          id: 4,
          songName: "Lorem Lorem",
          isCorrect: false,
        },
      ]
    }
  ];
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
