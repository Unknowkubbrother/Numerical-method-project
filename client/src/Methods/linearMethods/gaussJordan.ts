import { round } from "mathjs";

export interface GaussJordanRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface GaussJordanResponse {
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
    i?: number;
    j?: number;
    matrixA?: number[][];
    arrB?: number[];
  }
  
  

export function GaussJordanMethod(matrixA: number[][], arrB: number[]) : GaussJordanResponse{

    const result: GaussJordanResponse = {
        default: {
          matrixA: matrixA.map((arr) => [...arr]),
          arrB: [...arrB],
        },
        result: [],
        iterations: [],
        statusCode: 400,
      };

    for(let i = 0; i < matrixA.length; i++){
        for(let j = 0; j < matrixA.length; j++){
            if (i>j){
                    if (matrixA[i][j] == 0){
                        continue;
                    }
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

    for(let i = matrixA.length - 1; i >= 0; i--){
        for(let j =  matrixA.length - 1; j >= 0; j--){
            if (i<j){
                    if (matrixA[i][j] == 0){
                        continue;
                    }
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
                        arrB: round([...arrB],6),
                    });
            }
        }
    }

    for(let i = 0; i < matrixA.length; i++){
        result.result[i] = arrB[i]  / matrixA[i][i];
        result.result[i] = round(result.result[i], 6);
        arrB[i] /= matrixA[i][i];
        matrixA[i][i] /= matrixA[i][i];
        result.iterations.push({
            type: "backsub",
            i: i,
            j: i,
            matrixA: round(matrixA.map((arr) => [...arr]),6),
            arrB: (round([...arrB],6)),
        });

    }
    
    result.statusCode = 200;

    return result;



}