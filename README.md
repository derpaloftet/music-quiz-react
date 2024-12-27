# 🎵 Music Quiz

## What is Music Quiz?

Music Quiz is an interactive app designed to test your music knowledge in a fun way! 
Challenge yourself across different genres, answer questions, and see how well you know your favorite songs.

It features:
- **Intro**: Start a quiz.
- **Choice of Genres**: Choose your preferred genre from four categories.
- **Quiz**: Answer randomized questions by guessing the correct song based on the displayed lyrics. You have three attempts per session. Incorrect answers reduce your remaining attempts.
- **Outro**: View your final score and restart the quiz if you’d like to try again!

## How to start this project locally?
Start the Vite development server:
```shell
npm run dev
```

In a separate terminal tab, start Tailwind CSS in watch mode:
```shell
npx tailwindcss -i ./src/App.css -o ./src/output.css --watch
```

## Technical Overview

The World of Sourdough is built using **React** and **TypeScript**. Core Features:

**Components**:

[App](./src/App.tsx): a container component that manages the flow between pages (Intro, Genre, Quiz, Outro) and overall state (e.g., currentPage, scoreState).

[Quiz](./src/components/Quiz.tsx): a container component that handles the core quiz logic, including advancing questions, handling button clicks, and rendering feedback.

[AnswerButton](./src/components/AnswerButton.tsx): a reusable, presentational component responsible for rendering answer buttons with dynamic styles based on the quiz state.

[Intro](./src/components/Intro.tsx), [Genre](./src/components/Genre.tsx), [Outro](./src/components/Outro.tsx): presentational components that provide a clean UI and facilitate user interaction at various stages of the app.


**State Management**:

`useState` to handle pages, scores, attempts and genre data dynamically.

**Randomized Question Selection**:

Questions are selected randomly from the chosen genre's dataset, ensuring variability and replay value.

**Visual Design**:

- Designed with a **mobile-first approach**, ensuring it works seamlessly on smaller screens and scales up for larger devices.
- Buttons styled with **Tailwind CSS** using utility classes and the @apply directive for efficiency.
- The confetti effect enhances engagement.

**Responsiveness**:

- Disabled answer buttons after a selection ensures no double-clicking or unintended inputs.
- Immediate feedback helps players stay engaged and confident about their progress.

---

Music Quiz is the perfect activity to test your knowledge and discover new music along the way. Play, learn, and have fun!
