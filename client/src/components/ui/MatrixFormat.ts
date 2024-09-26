// import type { MathArray, Matrix } from 'mathjs';

export const DetFormat = (matrix: number[][]) => {
  let str = "";
  matrix.forEach((row, i) => {
    row.forEach((col, j) => {
      str += col + " ";
      if (j !== row.length - 1) {
        str += "& ";
      }
    });
    if (i !== matrix.length - 1) {
      str += "\\\\\\\\ ";
    }
  });
  return `\\begin{vmatrix} \\kern{5px} ${str} \\kern{5px} \\end{vmatrix}`;
};
