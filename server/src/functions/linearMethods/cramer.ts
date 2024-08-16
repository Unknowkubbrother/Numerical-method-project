import math from '../../lib/math';

export interface CramerRequest {
    martixA: number[][], 
    arrB: number[]
}

export interface CramerResponse {
    result: number[];
    martixAList: number[][][];
    detA: number;
    detAi: number[];
	error?: string;
    statusCode: number;
}
  

export function CramerMethod (martixA: number[][], arrB: number[]) : CramerResponse{

    const result: CramerResponse = { 
        result: [],
        martixAList: [],
        detA: 0,
        detAi: [],
        statusCode: 400
    };

    const detA = math.det(martixA);
    if(detA === 0){
        result.error = "Determinant of matrix A is 0";
        return result;
    }

    result.detA = detA;
    for(let i = 0; i < martixA.length; i++){
        let tempMartix: number[][] = martixA.map((arr) => [...arr]);
        for(let j = 0; j < martixA.length; j++){
            tempMartix[j][i] = arrB[j];
        }
        result.martixAList.push(tempMartix);
    }

    for(let i = 0; i < result.martixAList.length; i++){
        result.detAi.push(math.det(result.martixAList[i]));
        result.result.push(result.detAi[i] / detA);
    }
    
    result.statusCode = 200;

    return result;



}