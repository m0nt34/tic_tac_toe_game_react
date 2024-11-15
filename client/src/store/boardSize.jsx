import { create } from "zustand";

export const useBoardSize = create((set) => ({
  boardSize: 3,
  setBoardSize: (newBoardSize) =>
    set({
      boardSize: newBoardSize,
    }),
}));
