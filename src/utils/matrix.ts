import { Player } from "../entities/Player";

export function transpose(matrix: Player[][]): Player[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const transposedMatrix: Player[][] = Array(cols)
    .fill(null)
    .map(() => Array(rows).fill(null));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      transposedMatrix[cols - 1 - j][i] = matrix[i][j];
    }
  }

  return transposedMatrix;
}