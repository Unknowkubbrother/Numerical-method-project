import {det} from 'mathjs';
import { hasUndefinedMatrix, hasUndefinedArr } from "../../helper";
import {problemCreate} from '../../Api/problem';

export interface CramerRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface CramerResponse {
    defaultMatrixA: number[][];
    result: number[];
    matrixAList: number[][][];
    detA: number;
    detAi: number[];
	error?: string;
    statusCode: number;
}
  

export function CramerMethod (matrixA: number[][], arrB: number[]) : CramerResponse{
    
    const result: CramerResponse = { 
        defaultMatrixA: matrixA,
        result: [],
        matrixAList: [],
        detA: 0,
        detAi: [],
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
    
        const detA = det(matrixA);
        if(detA === 0){
            result.error = "Determinant of matrix A is 0";
            return result;
        }
    
    
        result.detA = detA;
        for(let i = 0; i < matrixA.length; i++){
            const tempMatrix: number[][] = matrixA.map((arr) => [...arr]);
            for(let j = 0; j < matrixA.length; j++){
                tempMatrix[j][i] = arrB[j];
            }
            result.matrixAList.push(tempMatrix);
        }
    
        for(let i = 0; i < result.matrixAList.length; i++){
            result.detAi.push(det(result.matrixAList[i]));
            result.result.push(result.detAi[i] / detA);
        }
        
        result.statusCode = 200;

        problemCreate({
            type: "Linear Algebraic Equation",
            solution: "cramer",
            input: {
                "matrixA" : matrixA,
                "arrB" : arrB
            },
            // output: result
        });
    
        return result;
    }catch(e){
        result.error = "failed to solve matrix";
        result.statusCode = 400;
        return result;
    }



}