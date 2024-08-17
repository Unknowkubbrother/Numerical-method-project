import math from '../../lib/math';

export interface GaussEliminationRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface GaussEliminationResponse {
    result: number[];
    matrixAList: number[][][];
    arrBList: number[][];
	error?: string;
    statusCode: number;
}
  

export function GaussEliminationMethod (matrixA: number[][], arrB: number[]) : GaussEliminationResponse{

    const result: GaussEliminationResponse = { 
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
        let sum = 0;
        for(let j = matrixA.length - 1; j > i; j--){
            sum += matrixA[i][j] * result.result[j];
        }
        result.result[i] = (arrB[i] - sum) / matrixA[i][i];
        result.result[i] = math.round(result.result[i], 6);
    }
    
    result.statusCode = 200;

    return result;



}