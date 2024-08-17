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

    for(let i = 0; i < martixA.length; i++){
        for(let j = 0; j < martixA.length; j++){
            if (i>j){
                if (martixA[j][i] != 0){
                    let tempMartixA = [...martixA[j]];
                    let temparrB = arrB[j];
                    tempMartixA = tempMartixA.map((value, index) => {
                        return (value / martixA[j][j]) * martixA[i][j];
                    });
                    temparrB = (temparrB / martixA[j][j]) * martixA[i][j];
                    martixA[i] = martixA[i].map((value, index) => {
                        return value - tempMartixA[index];
                    });
                    arrB[i] = arrB[i] - temparrB;
                    result.martixAList.push(martixA.map((arr) => [...arr]));
                    result.arrBList.push([...arrB]);
                }
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