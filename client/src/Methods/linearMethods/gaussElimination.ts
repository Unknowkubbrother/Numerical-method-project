import { round } from "mathjs";
import { hasUndefinedMatrix, hasUndefinedArr } from "../../helper";

export interface GaussEliminationRequest {
  matrixA: number[][];
  arrB: number[];
}

export interface GaussEliminationResponse {
  result: number[];
  default: {
    matrixA: number[][];
    arrB: number[];
  };
  iterations: GaussIteraions[];
  error?: string;
  statusCode: number;
}

interface GaussIteraions {
  type: "forward" | "backsub";
  i: number;
  j: number;
  matrixA?: number[][];
  arrB?: number[];
  value?: number;
  sumIdx?: number[];
}

export function GaussEliminationMethod(matrixA: number[][], arrB: number[]): GaussEliminationResponse {
  const result: GaussEliminationResponse = {
    default: {
      matrixA: matrixA.map((arr) => [...arr]),
      arrB: [...arrB],
    },
    result: [],
    iterations: [],
    statusCode: 400,
  };

  if (hasUndefinedMatrix(matrixA)) {
      result.error = "Matrix A contains undefined values";
      return result;
  }

  if (hasUndefinedArr(arrB)) {
      result.error = "Array B contains undefined values";
      return result;
  }


  try{
    if (matrixA[0].length > matrixA.length) {
      result.error = "More variables than equations";
      return result;
    }


    for (let i = 0; i < matrixA.length; i++) {
      for (let j = 0; j < matrixA.length; j++) {
        if (i > j) {
          //   if (matrixA[i][j] == 0){
          //     continue;
          // }
            let tempMatrixA = [...matrixA[j]];
            let temparrB = arrB[j];
            tempMatrixA = tempMatrixA.map((value) => {
              return (value / matrixA[j][j]) * matrixA[i][j];
            });
            temparrB = (temparrB / matrixA[j][j]) * matrixA[i][j];
            matrixA[i] = matrixA[i].map((value, index) => {
              return value - tempMatrixA[index];
            });
            arrB[i] = arrB[i] - temparrB;
            result.iterations.push({
              type: "forward",
              i: i,
              j: j,
              matrixA: round(matrixA.map((arr) => [...arr]),6),
              arrB: (round([...arrB],6)),
            });
        }
      }
    }

    for (let i = matrixA[0].length - 1; i >= 0; i--) {
      let sum = 0;
      const sumIdx: number[] = [];
      for (let j = matrixA[0].length - 1; j > i; j--) {
        sumIdx.push(j);
        sum += matrixA[i][j] * result.result[j];
      }
      result.iterations.push({
        type: "backsub",
        i: i,
        j: i,
        value: (arrB[i] - sum) / matrixA[i][i],
        sumIdx: sumIdx,
      });
      result.result[i] = (arrB[i] - sum) / matrixA[i][i];
      result.result[i] = round(result.result[i], 6);
    }

    result.statusCode = 200;

    return result;
  }catch(e){
    result.error = "failed to solve matrix";
    result.statusCode = 400;
    return result
  }
}
