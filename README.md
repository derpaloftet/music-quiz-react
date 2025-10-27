# 🎵 Music Quiz

## What is Music Quiz

Music Quiz is an interactive app designed to test your music knowledge in a fun way! 
Challenge yourself across different genres, answer questions, and see how well you know your favorite songs.

It features:
- **Intro**: Start a quiz.
- **Choice of Genres**: Choose your preferred genre from four categories.
- **Quiz**: Answer randomized questions by guessing the correct song based on the displayed lyrics. You have three attempts per session. Incorrect answers reduce your remaining attempts.
- **Outro**: View your final score and restart the quiz if you’d like to try again!

## How to start this project locally
Start the Vite development server:
```shell
npm run dev
```

## Technical Overview

The Music Quiz is built using **React** and **TypeScript**. Core Features:

**Components**:

[App](./src/App.tsx): a container component that manages the flow between pages (Intro, Genre, Quiz, Outro) and overall state (e.g., currentPage, scoreState).

[Quiz](./src/components/Quiz.tsx): a container component that handles the core quiz logic, including advancing questions, handling button clicks, and rendering feedback.

[AnswerButton](./src/components/AnswerButton.tsx): a presentational component responsible for rendering answer buttons with dynamic styles based on the quiz state.

[Intro](./src/components/Intro.tsx), [Genre](./src/components/Genre.tsx), [Outro](./src/components/Outro.tsx): presentational components that provide a clean UI and facilitate user interaction at various stages of the app.


**State Management**:

- `useState` to handle pages, scores, attempts and genre data dynamically.

**Visual Design**:

- Designed with a **mobile-first approach**, ensuring it works seamlessly on smaller screens and scales up for larger devices.
- Buttons styled with **Tailwind CSS**.
- The [Confetti](https://github.com/alampros/react-confetti) effect enhances engagement.

**Responsiveness**:

- Disabled answer buttons after a selection ensures no double-clicking or unintended inputs.
- Immediate feedback helps players stay engaged and confident about their progress.

**Testing with Playwright**:

- Page Navigation Verification: Ensures each page renders correctly and displays the expected UI elements.
- Quiz Functionality Testing: Validates randomized question generation, correct scoring logic and proper handling of incorrect answers, attempts, and skipped questions.
- Edge Cases: Tests behavior when all attempts are used up or questions are skipped, ensuring proper handling of "no more questions" scenarios and accurate final score display.
- Replayability: Checks the ability to restart the quiz after completing a session, returning users to the genre selection page.

**Deployment & CI/CD**:

- Continuous Integration: Set up with CircleCI for automated testing and builds on every commit.
- Deployment: Automatically deployed to Netlify on successful builds.

---

Music Quiz is the perfect activity to test your knowledge and discover new music along the way. Play, learn, and have fun!

