export type GenreKeys = "indieRock" | "pop2000" | "popPunk" | "pop1990";

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