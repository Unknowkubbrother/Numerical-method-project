
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

export const ArrayFormat = (arr: number[]) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += arr[i];
    if (i !== arr.length - 1) {
      str += "\\\\";
    }
  }
  return `\\begin{Bmatrix} ${str} \\end{Bmatrix}`;

};

export const GaussFormat = (matrix: number[][], arrB: number[], hightlight?: {row: number | undefined,col: number | undefined}[]) => {
  let strmatrixA = "";
  let strarrB = "";
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let isHightlight = false;
        if (hightlight){
          for (let k = 0; k < hightlight.length; k++){
            if (hightlight[k].row === i && hightlight[k].col === j){
              isHightlight = true;
              break;
            }
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

export const MatrixInversionFormat = (matrixA: number[][], matrixAIn : number[][], hightlight?: {row: number | undefined,col: number | undefined}[]) => {
  let strmatrixA = "";
  let strmatrixAIn = "";
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixA[i].length; j++) {
      let isHightlight = false;
        if (hightlight){
          for (let k = 0; k < hightlight.length; k++){
            if (hightlight[k].row === i && hightlight[k].col === j){
              isHightlight = true;
              break;
            }
          }
        }
      if (isHightlight){
        strmatrixA += `\\color{red} ${matrixA[i][j]}`;
        strmatrixAIn += `\\color{red} ${matrixAIn[i][j]}`;
      }
      else{
        strmatrixA += matrixA[i][j];
        strmatrixAIn += matrixAIn[i][j];
      }
      if (j !== matrixA[i].length - 1) {
        strmatrixA += "& ";
        strmatrixAIn += "& ";
      }
    }
    if (i !== matrixA.length - 1) {
      strmatrixA += "\\\\";
      strmatrixAIn += "\\\\";
    }
  }

  return `\\begin{bmatrix}
          \\begin{matrix}
            ${strmatrixA}
          \\end{matrix}
          \\kern{10px}
          \\begin{array}{|ccc}
            ${strmatrixAIn}
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
export const LMatrixFormat = (matrix:number[][]) => {
  let str = "";
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      if (i>= j){
        str += `{{L_{${i+1}${j+1}}}} `;
      }else{
        str += `0`;
      }
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

export const LTMatrixFormat = (matrix:number[][]) => {
  let str = "";
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      if (j>= i){
        str += `{{L_{${j+1}${i+1}}}} `;
      }else{
        str += `0`;
      }
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

export const UMatrixFormat = (matrix:number[][]) => {
  let str = "";
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      if (i == j){
        str += `1`;
      }else if (i < j){
        str += `{{U_{${i+1}${j+1}}}} `;
      }else{
        str += `0`;
      }
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

export const TextMatrixFormat = (matrix:number[][] , text : string) => {
  let str = "";
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      str += `{{${text}_{${i+1}${j+1}}}} `;
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

export const TextArrayFormat = (arr: number[], text: string) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += `{{${text}_{${i+1}}}}`;
    if (i !== arr.length - 1) {
      str += "\\\\";
    }
  }
  return `\\begin{Bmatrix} ${str} \\end{Bmatrix}`;
};