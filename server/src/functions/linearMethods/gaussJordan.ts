import math from '../../lib/math';

export interface GaussJordanRequest {
    martixA: number[][], 
    arrB: number[]
}

export interface GaussJordanResponse {
    result: number[];
    martixAList: number[][][];
    arrBList: number[][];
	error?: string;
    statusCode: number;
}
  

export function GaussJordanMethod(martixA: number[][], arrB: number[]) : GaussJordanResponse{

    const result: GaussJordanResponse = { 
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
        for(let j =  martixA.length - 1; j >= 0; j--){
            if (i<j){
                if (martixA[i][j] != 0){
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

    for(let i = 0; i < martixA.length; i++){
        result.result[i] = arrB[i]  / martixA[i][i];
        result.result[i] = math.round(result.result[i], 6);
    }
    
    result.statusCode = 200;

    return result;



}