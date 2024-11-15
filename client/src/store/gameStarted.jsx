import {create} from "zustand";

export const useGameStarted = create((set) => ({
  gameStarted: false,
  setGameStarted: (newGameStarted) =>
    set({
      gameStarted: newGameStarted,
    }),
}));
