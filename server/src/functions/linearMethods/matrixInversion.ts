import math from '../../lib/math';

export interface MatrixInversionRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface MatrixInversionResponse {
    result: number[];
    matrixAInverse: number[][];
	error?: string;
    statusCode: number;
}
  

export function MatrixInversionMethod(matrixA: number[][], arrB: number[]) : MatrixInversionResponse{

    const result: MatrixInversionResponse = { 
        result: [],
        matrixAInverse: [],
        statusCode: 400
    };

    let matrixAInverse = math.inv(matrixA);
    result.matrixAInverse = matrixAInverse.map((arr : []) => 
        arr.map((value : number) => math.round(value, 6))
    );
    for(let i = 0; i < arrB.length; i++){
        let sum = 0;
        for(let j = 0; j < matrixA.length; j++){
            sum += matrixAInverse[i][j] * arrB[j];
        }
        result.result.push(math.round(sum, 6));
    }
    
    result.statusCode = 200;

    return result;



}