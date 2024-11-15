import { useWinningPatterns } from "../store/winningPatterns";

export const generateWinningPattern = (size) => {
  const { setWinningPatterns } = useWinningPatterns.getState();
  const finalPatterns = [];

  for (let i = 0; i < size; i++) {
    const rowPattern = Array.from({ length: size }, (_, j) => j + size * i);
    const columnPattern = Array.from({ length: size }, (_, j) => i + size * j);
    finalPatterns.push(rowPattern, columnPattern);
  }

  finalPatterns.push(
    Array.from({ length: size }, (_, i) => i * (parseInt(size) + 1))
  );

  finalPatterns.push(
    Array.from({ length: size }, (_, i) => (i + 1) * (size - 1))
  );

  setWinningPatterns(finalPatterns);
};
