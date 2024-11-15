import { create } from "zustand";

export const useWinningPatterns = create((set) => ({
  winningPatterns: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  setWinningPatterns: (newWinningPatterns) =>
    set({
      winningPatterns: newWinningPatterns,
    }),
}));
