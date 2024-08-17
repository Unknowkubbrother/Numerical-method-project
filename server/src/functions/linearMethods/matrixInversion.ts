import math from '../../lib/math';

export interface MatrixInversionRequest {
    martixA: number[][], 
    arrB: number[]
}

export interface MatrixInversionResponse {
    result: number[];
    martixAInverse: number[][];
	error?: string;
    statusCode: number;
}
  

export function MatrixInversionMethod(martixA: number[][], arrB: number[]) : MatrixInversionResponse{

    const result: MatrixInversionResponse = { 
        result: [],
        martixAInverse: [],
        statusCode: 400
    };

    let martixAInverse = math.inv(martixA);
    result.martixAInverse = martixAInverse.map((arr : []) => 
        arr.map((value : number) => math.round(value, 6))
    );
    for(let i = 0; i < arrB.length; i++){
        let sum = 0;
        for(let j = 0; j < martixA.length; j++){
            sum += martixAInverse[i][j] * arrB[j];
        }
        result.result.push(math.round(sum, 6));
    }
    
    result.statusCode = 200;

    return result;



}