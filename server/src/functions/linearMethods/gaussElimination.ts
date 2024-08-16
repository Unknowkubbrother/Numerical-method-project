import math from '../../lib/math';

export interface GaussEliminationRequest {
    martixA: number[][], 
    arrB: number[]
}

export interface GaussEliminationResponse {
    result: number[];
    martixAList: number[][][];
	error?: string;
    statusCode: number;
}
  

export function GaussEliminationMethod (martixA: number[][], arrB: number[]) : GaussEliminationResponse{

    const result: GaussEliminationResponse = { 
        result: [],
        martixAList: [],
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
            }
        }
    }

    console.log(martixA, arrB);

    // console.log(martixA);

    

    
    result.statusCode = 200;

    return result;



}