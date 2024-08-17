import math from '../../lib/math';

export interface CramerRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface CramerResponse {
    result: number[];
    matrixAList: number[][][];
    detA: number;
    detAi: number[];
	error?: string;
    statusCode: number;
}
  

export function CramerMethod (matrixA: number[][], arrB: number[]) : CramerResponse{

    const result: CramerResponse = { 
        result: [],
        matrixAList: [],
        detA: 0,
        detAi: [],
        statusCode: 400
    };

    const detA = math.det(matrixA);
    if(detA === 0){
        result.error = "Determinant of matrix A is 0";
        return result;
    }

    result.detA = detA;
    for(let i = 0; i < matrixA.length; i++){
        let tempMatrix: number[][] = matrixA.map((arr) => [...arr]);
        for(let j = 0; j < matrixA.length; j++){
            tempMatrix[j][i] = arrB[j];
        }
        result.matrixAList.push(tempMatrix);
    }

    for(let i = 0; i < result.matrixAList.length; i++){
        result.detAi.push(math.det(result.matrixAList[i]));
        result.result.push(result.detAi[i] / detA);
    }
    
    result.statusCode = 200;

    return result;



}