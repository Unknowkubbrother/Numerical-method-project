import {round} from 'mathjs';
import { hasUndefinedMatrix, hasUndefinedArr } from "../../helper";

export interface CholeskydecompositionRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface CholeskydecompositionResponse {
    result: number[];
    defaultMatrix: {
        matrixA: number[][];
        arrB: number[];
    };
    matrixL: number[][];
    iteration : CholeskydecompositionIteraion[];
    matrixLT: number[][];
    arrY : number[];
	error?: string;
    statusCode: number;
}

interface CholeskydecompositionIteraion {
    type: "L";
    row: number;
    col: number;
    sumstart: number;
    subtractofproduct: {
        type: "L";
        i: number;
        j: number;
        value: number;
    }[];
    divide?: number
}
  
  

export function CholeskydecompositionMethod(matrixA: number[][], arrB: number[]) : CholeskydecompositionResponse{

    const result: CholeskydecompositionResponse = { 
        result: [],
        defaultMatrix: {
            matrixA: matrixA.map((arr) => [...arr]),
            arrB: arrB.map((arr) => arr),
        },
        matrixL: [],
        iteration: [],
        matrixLT: [],
        arrY: [],
        statusCode: 400
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
    
        const matrixL:number[][] = createMatrix(matrixA.length);
        const matrixLT:number[][] = createMatrix(matrixA.length);
    
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
                const sumstart = sum;
                const subtractofproduct: {i: number, j: number, value: number , type: "L"}[] = [];
                for(let k=0; k < j; k++){
                    sum -= matrixL[i][k] * matrixLT[k][j];
                    subtractofproduct.push({
                        type: "L",
                        i: i,
                        j: k,
                        value: round(matrixL[i][k], 6)
                    });
                    subtractofproduct.push({
                        type: "L",
                        i: i,
                        j: k,
                        value: round(matrixLT[k][j],6),
                    });
                }
                if (i == j){
                    matrixL[i][j] = Math.sqrt(sum);
                    matrixLT[j][i] = matrixL[i][j];
                    result.iteration.push({
                        type: "L",
                        row: i,
                        col: j,
                        sumstart: sumstart,
                        subtractofproduct: subtractofproduct,
                    });
                }
                else{
                    matrixL[i][j] = sum / matrixL[j][j];
                    matrixLT[j][i] = matrixL[i][j];
                    result.iteration.push({
                        type: "L",
                        row: i,
                        col: j,
                        sumstart: sumstart,
                        subtractofproduct: subtractofproduct,
                        divide: round(matrixL[j][j], 6)
                    });
                }
            }
        }
    
        result.matrixL = round(matrixL,6);
        result.matrixLT = round(matrixLT,6);
    
        //LY = B
        const arrY:number[] = new Array(arrB.length);
        for(let i = 0; i < matrixL.length; i++){
            let sum =  0;
            for(let j = 0; j < i; j++){
                sum += matrixL[i][j] * arrY[j];
            }
            arrY[i] = round((arrB[i] - sum) / matrixL[i][i], 6);
        }
    
        result.arrY = arrY;
    
    
        //L^tX = Y
        const arrX:number[] = new Array(arrY.length);
        for(let i = matrixLT.length - 1; i >= 0; i--){
            let sum =  0;
            for(let j = matrixLT.length - 1; j > i; j--){
                sum += matrixLT[i][j] * arrX[j];
            }
            arrX[i] = round((arrY[i] - sum) / matrixLT[i][i], 6);
        }
    
        result.result = arrX;
    
        result.statusCode = 200;
    
        return result;
    }catch(e){
        result.error = "failed to solve matrix";
        result.statusCode = 400;
        return result;
    }



}