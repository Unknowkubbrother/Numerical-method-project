import math from '../../lib/math';

export interface LudecompositionRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface LudecompositionResponse {
    result: number[];
    matrixL: number[][];
    matrixU: number[][];
    arrY : number[];
	error?: string;
    statusCode: number;
}
  

export function LudecompositionMethod(matrixA: number[][], arrB: number[]) : LudecompositionResponse{

    const result: LudecompositionResponse = { 
        result: [],
        matrixL: [],
        matrixU: [],
        arrY: [],
        statusCode: 400
    };

    let matrixL:number[][] = [];
    let matrixU:number[][] = [];

    // for (let i = 0; i < matrixA; i++) {
	// 	for (let j = 0; j < n; j++) {
	// 		matrixL[i][j] = 0;
	// 		matrixU[i][j] = i == j ? 1 : 0;
	// 	}
	// }

    // for(let i=0; i < matrixA.length; i++){
    //     for(let j=0; j < matrixA.length; j++){
    //         let sum = 0;
    //         for(let k=0; k < matrixA.length; k++){
    //             // sum += matrixL[i][k] * matrixU[k][j];
    //             console.log(matrixL[i][k], matrixU[k][j]);
    //         }
    //     }
    // } 

    
    
    result.statusCode = 200;

    return result;



}