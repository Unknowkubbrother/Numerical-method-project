import math from '../../lib/math';

export interface CholeskydecompositionRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface CholeskydecompositionResponse {
    result: number[];
    matrixL: number[][];
    matrixLT: number[][];
    arrY : number[];
	error?: string;
    statusCode: number;
}
  

export function CholeskydecompositionMethod(matrixA: number[][], arrB: number[]) : CholeskydecompositionResponse{

    const result: CholeskydecompositionResponse = { 
        result: [],
        matrixL: [],
        matrixLT: [],
        arrY: [],
        statusCode: 400
    };

    for(let i=0; i < matrixA.length; i++){
        for(let j = 0; j <= i; j++){
            if(matrixA[i][j] != matrixA[j][i]){
                result.error = "Matrix A is not symmetric";
                return result;
            }
        }
    }

    const createMatrix = (matrixSize: number) => {
        const matrix = new Array(Number(matrixSize));
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = new Array(Number(matrixSize));
        }
        return matrix;
    };

    let matrixL:number[][] = createMatrix(matrixA.length);
    let matrixLT:number[][] = createMatrix(matrixA.length);

    for (let i = 0; i < matrixA.length; i++) {
		for (let j = 0; j < matrixA.length; j++) {
			matrixL[i][j] = 0;
			matrixLT[i][j] = 0;
		}
	}

    //LL^t = A
    for(let i=0; i < matrixA.length; i++){
        for(let j = 0; j <= i; j++){
            let sum = matrixA[i][j];
            for(let k=0; k < j; k++){
                sum -= matrixL[i][k] * matrixLT[k][j];
            }
            if (i == j){
                matrixL[i][j] = Math.sqrt(sum);
                matrixLT[j][i] = matrixL[i][j];
            }
            else{
                matrixL[i][j] = sum / matrixL[j][j];
                matrixLT[j][i] = matrixL[i][j];
            }
        }
    }

    result.matrixL = matrixL;
    result.matrixLT = matrixLT;

    //LY = B
    let arrY:number[] = new Array(arrB.length);
    for(let i = 0; i < matrixL.length; i++){
        let sum =  0;
        for(let j = 0; j < i; j++){
            sum += matrixL[i][j] * arrY[j];
        }
        arrY[i] = math.round((arrB[i] - sum) / matrixL[i][i], 6);
    }

    result.arrY = arrY;


    //L^tX = Y
    let arrX:number[] = new Array(arrY.length);
    for(let i = matrixLT.length - 1; i >= 0; i--){
        let sum =  0;
        for(let j = matrixLT.length - 1; j > i; j--){
            sum += matrixLT[i][j] * arrX[j];
        }
        arrX[i] = math.round((arrY[i] - sum) / matrixLT[i][i], 6);
    }

    result.result = arrX;

    result.statusCode = 200;

    return result;



}