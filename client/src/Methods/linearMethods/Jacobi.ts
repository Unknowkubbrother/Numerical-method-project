// import {round} from 'mathjs';

export interface JacobiRequest {
    matrixA: number[][], 
    arrB: number[],
    initialX: number[],
    errorFactor: number
}

export interface JacobiResponse {
    result: JacobiIterationData;
    default: {
        matrixA: number[][];
        arrB: number[];
    };
    iter: number;
    backsub : Backsub[];
	iterations: JacobiIterationData[];
	error?: string;
    statusCode: number;
}

interface Backsub {
    sumstart: number;
    i: number;
    j: number;
    sumIdx?: number[];
  }
  
export interface JacobiIterationData {
	iter: number;
	error: number[];
	x: number[];
}

export function JacobiMethod(matrixA: number[][], arrB: number[] , initialX:number[], errorFactor: number) : JacobiResponse{

    const result: JacobiResponse = { 
        iter: 0,
        default: {
            matrixA: matrixA.map((arr) => [...arr]),
            arrB: [...arrB],
        },
        result: {
            iter: 0,
            error: [],
            x: []
        },
        backsub: [],
        iterations: [],
        statusCode: 400
    };


    const calculateError = (newValue: number, oldValue: number) => {
		return Math.abs((newValue - oldValue));
	};

    const checkError = (arrX: number[], arrXOld: number[]) => {
        for(let i = 0; i < arrX.length; i++){
            if (calculateError(arrX[i],arrXOld[i]) >= errorFactor){
                return true;
            }
        }
        return false;
    };

    for(let i = 0; i < matrixA.length; i++){
        const sum = arrB[i];
        const sumIdx : number[] = [];
           for(let j = 0; j < matrixA.length; j++){
             if (i !== j && matrixA[i][j] !== 0) {
                sumIdx.push(j);
             }
           }
        result.backsub.push({
            sumstart: sum,
            i: i,
            j: i,
            sumIdx: sumIdx
        });
     }


    const arrX = Array(initialX.length).fill(0);
    let arrXOld = Array(matrixA.length).fill(0);
    let iterations = 0;
    const MAX_ITERATIONS = 1000;
    do{
        iterations++;
        arrXOld = arrX.map((x) => x);
        for(let i = 0; i < matrixA.length; i++){
           let sum = arrB[i];
              for(let j = 0; j < matrixA.length; j++){
                if (i !== j) {
                     sum -= matrixA[i][j] * arrXOld[j];
                }
              }
            arrX[i] = sum / matrixA[i][i];
        }

        result.iterations.push(
            {
            iter: iterations,
            error: Array(matrixA.length).fill(0).map((_,index) => calculateError(arrX[index], arrXOld[index])),
            x: arrX.map((x) => x)
        });
        
    }while(checkError(arrX, arrXOld) && MAX_ITERATIONS > iterations);

    result.iter = iterations;

    result.result = {
        iter: iterations,
        error: Array(matrixA.length).fill(0).map((_,index) => calculateError(arrX[index], arrXOld[index])),
        x: arrX.map((x) => x)
    };

    result.statusCode = 200;

    return result;



}

// {
//     "matrixA": [[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]], 
//     "arrB": [12,17,14,7],
//     "initialX": [0,0,0,0],
//     "errorFactor": 0.000001
// }