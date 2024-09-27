export const DetFormat = (matrix: number[][]) => {
  let str = "";
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      str += matrix[i][j] + " ";
      if (j !== matrix[i].length - 1) {
        str += "& ";
      }
    }
    if (i !== matrix.length - 1) {
      str += "\\\\\\\\ ";
    }
  }
  return `\\begin{vmatrix} \\kern{5px} ${str} \\kern{5px} \\end{vmatrix}`;
};

export const GaussFormat = (matrix: number[][], arrB: number[], hightlight: {row: number,col: number}[]) => {
  let strmatrixA = "";
  let strarrB = "";
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let isHightlight = false;
        for (let k = 0; k < hightlight.length; k++){
          if (hightlight[k].row === i && hightlight[k].col === j){
            isHightlight = true;
            break;
          }
        }
      if (isHightlight){
        strmatrixA += `\\color{red} ${matrix[i][j]}`;
      }
      else{
        strmatrixA += matrix[i][j];
      }
      if (j !== matrix[i].length - 1) {
        strmatrixA += "& ";
      }
    }
    if (i !== matrix.length - 1) {
      strmatrixA += "\\\\";
    }
    strarrB += `& ${arrB[i]}`;
    if (i !== matrix.length - 1) {
      strarrB += "\\\\";
    }
  }

  return `\\begin{bmatrix}
          \\begin{matrix}
            ${strmatrixA}
          \\end{matrix}
          \\begin{array}{c|c}
            ${strarrB}
          \\end{array} 
          \\end{bmatrix}`;
};


export const MatrixFormat = (matrix:number[][]) => {
  let str = "";
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      str += matrix[i][j] + " ";
      if(j !== matrix[i].length - 1){
        str += "& ";
      }
    }
    if(i !== matrix.length - 1){
      str += "\\\\\\\\ ";
    }
  }
  return `\\begin{bmatrix} \\kern{5px} ${str} \\kern{5px} \\end{bmatrix}`;

}