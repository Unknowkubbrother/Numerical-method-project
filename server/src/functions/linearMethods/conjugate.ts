import math from '../../lib/math';

export interface ConjugateRequest {
    matrixA: number[][], 
    arrB: number[],
    initialX: number[],
    errorFactor: number
}

export interface ConjugateResponse {
    result: ConjugateIterationData;
    iter: number;
    iterations: ConjugateIterationData[];
    error?: string;
    statusCode: number;
}

interface ConjugateIterationData {
	iter: number;
    lamda: number;
    x: number[];
    r: number[];
	error: number;
    alpha: number;
    d: number[];
}

export function ConjugateMethods(matrixA: number[][], arrB: number[] , initialX:number[], errorFactor: number) : ConjugateResponse{

    const result: ConjugateResponse = { 
        iter: 0,
        result: {
            iter: 0,
            lamda: 0,
            x: [],
            r: [],
            error: 0,
            alpha: 0,
            d: []
        },
        iterations: [],
        statusCode: 400
    };

    const calculateError = (arrR:number[]) => {
        return math.sqrt(math.multiply(math.transpose(arrR), arrR))
    }


    let arrX = Array(initialX.length).fill(0);
    let arrR = math.subtract(math.multiply(matrixA, arrX), arrB);
    let arrD = math.multiply(arrR, -1);
    let iterations = 0;
    let error;

    do{
        iterations++;
        let lamda = -1*(math.multiply(math.transpose(arrD), arrR) / math.multiply(math.multiply(math.transpose(arrD), matrixA), arrD));
        arrX = math.add(arrX, math.multiply(lamda, arrD));
        arrR = math.subtract(math.multiply(matrixA, arrX), arrB);
        let alpha = math.multiply(math.multiply(math.transpose(arrR), matrixA), arrD) / math.multiply(math.multiply(math.transpose(arrD), matrixA), arrD);
        arrD = math.subtract(arrR, math.multiply(alpha, arrD));
        error = calculateError(arrR);
        result.iterations.push({
            iter: iterations,
            lamda: math.round(lamda, 6),
            x: math.round(arrX, 6),
            r: math.round(arrR, 6),
            error: math.round(error, 6),
            alpha: math.round(alpha, 6),
            d: math.round(arrD, 6)
        });
    }while(error >= errorFactor);

    result.iter = iterations;

    result.result = result.iterations[result.iterations.length - 1];

    result.statusCode = 200;

    return result;

}

// {
//     "matrixA": [[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]], 
//     "arrB": [12,17,14,7],
//     "initialX": [0,0,0,0],
//     "errorFactor": 0.000001
// }