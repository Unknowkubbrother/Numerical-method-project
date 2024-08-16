import math from '../../lib/math';

export interface GaussEliminationRequest {
    martixA: number[][], 
    arrB: number[]
}

export interface GaussEliminationResponse {
    result: number[];
    martixAList: number[][][];
    arrBList: number[][];
	error?: string;
    statusCode: number;
}
  

export function GaussEliminationMethod (martixA: number[][], arrB: number[]) : GaussEliminationResponse{

    const result: GaussEliminationResponse = { 
        result: [],
        martixAList: [],
        arrBList: [],
        statusCode: 400
    };

    for(let i = 0; i < martixA.length -1; i++){
        for(let j = i+1; j < martixA.length; j++){
            if (martixA[j][i] != 0){
                let tempMartixA = [...martixA[i]];
                let temparrB = arrB[i];
                tempMartixA = tempMartixA.map((value, index) => {
                    return (value / martixA[i][i]) * martixA[j][i];
                });
                temparrB = (temparrB / martixA[i][i]) * martixA[j][i];
                martixA[j] = martixA[j].map((value, index) => {
                    return value - tempMartixA[index];
                });
                arrB[j] = arrB[j] - temparrB;
                result.martixAList.push(martixA.map((arr) => [...arr]));
                result.arrBList.push([...arrB]);
            }
        }
    }
    

    for(let i = martixA.length - 1; i >= 0; i--){
        let sum = 0;
        for(let j = martixA.length - 1; j > i; j--){
            sum += martixA[i][j] * result.result[j];
        }
        result.result[i] = (arrB[i] - sum) / martixA[i][i];
        result.result[i] = math.round(result.result[i], 6);
    }
    
    result.statusCode = 200;

    return result;



}