import math from 'mathjs';

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

    const createMatrix = (matrixSize: number) => {
        const matrix = new Array(Number(matrixSize));
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = new Array(Number(matrixSize));
        }
        return matrix;
    };

    const matrixL:number[][] = createMatrix(matrixA.length);
    const matrixU:number[][] = createMatrix(matrixA.length);

    for (let i = 0; i < matrixA.length; i++) {
		for (let j = 0; j < matrixA.length; j++) {
			matrixL[i][j] = 0;
			matrixU[i][j] = i == j ? 1 : 0;
		}
	}

    //LU = A
    for(let i=0; i < matrixA.length; i++){
        for(let j=0; j < matrixA.length; j++){
            let sum = matrixA[i][j];
            for(let k=0; k < matrixA.length; k++){
                sum -= matrixL[i][k] * matrixU[k][j];
            }

            if (i >= j){
                matrixL[i][j] = sum / matrixU[i][i];
            }
            else{
                matrixU[i][j] = sum / matrixL[i][i];
            }
        }
    } 

    result.matrixL = matrixL;
    result.matrixU = matrixU;

    //LY = B
    const arrY:number[] = new Array(arrB.length);
    for(let i = 0; i < matrixL.length; i++){
        let sum =  0;
        for(let j = 0; j < i; j++){
            sum += matrixL[i][j] * arrY[j];
        }
        arrY[i] = math.round((arrB[i] - sum) / matrixL[i][i], 6);
    }

    result.arrY = arrY;


    //UX = Y
    const arrX:number[] = new Array(arrY.length);
    for(let i = matrixU.length - 1; i >= 0; i--){
        let sum =  0;
        for(let j = matrixU.length - 1; j > i; j--){
            sum += matrixU[i][j] * arrX[j];
        }
        arrX[i] = math.round((arrY[i] - sum) / matrixU[i][i], 6);
    }

    result.result = arrX;

    result.statusCode = 200;

    return result;



}