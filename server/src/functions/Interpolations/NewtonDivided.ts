import math from '../../lib/math';

export interface NewtonDividedRequest {
    x: number,
    points: {
        x:number,
        y:number
    }[]
}

export interface NewtonDividedResponse {
    result: number;
    iterations: NewtonDividedIterationData[];
    error?: string;
    statusCode: number;
}

interface NewtonDividedIterationData {
    C: number;
    MutiOfSubtract: number[];
    sum : number;
}


export function NewtonDividedMethods( x:number, points: {x:number, y:number}[]) : NewtonDividedResponse{

    const result: NewtonDividedResponse = { 
        result: 0,
        iterations: [],
        statusCode: 400
    };

    let C = points.map((point) => point.y);

    for(let i= 1 ; i<points.length; i++){
        for(let j= points.length-1; j>=i; j--){
            C[j] = (C[j] - C[j-1]) / (points[j].x - points[j-i].x);
        }
    }

    for (let i = 0; i < points.length; i++) {
        let sum = C[i];
        let MutiOfSubtract = [1];
        for (let j = 0; j < i; j++) {
            MutiOfSubtract.push(x - points[j].x);
            sum *= (x - points[j].x);
        }
        result.iterations.push({
            C: C[i],
            MutiOfSubtract: MutiOfSubtract,
            sum: sum
        });
        result.result += sum;
    }

    result.statusCode = 200;

    return result;

}

// {
//     "matrixA": [[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]], 
//     "arrB": [12,17,14,7],
//     "initialX": [0,0,0,0],
//     "errorFactor": 0.000001
// }