import math from '../../lib/math';

export interface GaussJordanRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface GaussJordanResponse {
    result: number[];
    matrixAList: number[][][];
    arrBList: number[][];
	error?: string;
    statusCode: number;
}
  

export function GaussJordanMethod(matrixA: number[][], arrB: number[]) : GaussJordanResponse{

    const result: GaussJordanResponse = { 
        result: [],
        matrixAList: [],
        arrBList: [],
        statusCode: 400
    };

    for(let i = 0; i < matrixA.length; i++){
        for(let j = 0; j < matrixA.length; j++){
            if (i>j){
                if (matrixA[j][i] != 0){
                    let tempMatrixA = [...matrixA[j]];
                    let temparrB = arrB[j];
                    tempMatrixA = tempMatrixA.map((value, index) => {
                        return (value / matrixA[j][j]) * matrixA[i][j];
                    });
                    temparrB = (temparrB / matrixA[j][j]) * matrixA[i][j];
                    matrixA[i] = matrixA[i].map((value, index) => {
                        return value - tempMatrixA[index];
                    });
                    arrB[i] = arrB[i] - temparrB;
                    result.matrixAList.push(matrixA.map((arr) => [...arr]));
                    result.arrBList.push([...arrB]);
                }
            }
        }
    }

    for(let i = matrixA.length - 1; i >= 0; i--){
        for(let j =  matrixA.length - 1; j >= 0; j--){
            if (i<j){
                if (matrixA[i][j] != 0){
                    let tempMatrixA = [...matrixA[j]];
                    let temparrB = arrB[j];
                    tempMatrixA = tempMatrixA.map((value, index) => {
                        return (value / matrixA[j][j]) * matrixA[i][j];
                    });
                    temparrB = (temparrB / matrixA[j][j]) * matrixA[i][j];
                    matrixA[i] = matrixA[i].map((value, index) => {
                        return value - tempMatrixA[index];
                    });
                    arrB[i] = arrB[i] - temparrB;
                    result.matrixAList.push(matrixA.map((arr) => [...arr]));
                    result.arrBList.push([...arrB]);
                }
            }
        }
    }

    for(let i = 0; i < matrixA.length; i++){
        result.result[i] = arrB[i]  / matrixA[i][i];
        result.result[i] = math.round(result.result[i], 6);
    }
    
    result.statusCode = 200;

    return result;



}