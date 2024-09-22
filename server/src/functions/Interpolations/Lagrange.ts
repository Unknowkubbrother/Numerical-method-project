import math from '../../lib/math';

export interface LagrangeRequest {
    x: number,
    points: {
        x:number,
        y:number
    }[]
}

export interface LagrangeResponse {
    result: number;
    iterations: LagrangeIterationData[];
    error?: string;
    statusCode: number;
}

interface LagrangeIterationData {
    L: number;
    Y: number;
    sum : number;
}

export function LagrangeMethods( x:number, points: {x:number, y:number}[]) : LagrangeResponse{

    const result: LagrangeResponse = { 
        result: 0,
        iterations: [],
        statusCode: 400
    };

    for(let i = 0; i < points.length; i++){
        let L = 1;
        for(let j = 0; j < points.length; j++){
            if(i != j){
                L *= (points[j].x - x) / (points[j].x - points[i].x);
            }
        }
        let sum = L * points[i].y;
        result.iterations.push({
            L: L,
            Y: points[i].y,
            sum: sum
        });
        result.result += sum;
    }

    result.statusCode = 200;

    return result;

}

// {
//     "x": 42000, 
//     "points": [
//         {"x": 0, "y": 9.81},
//         {"x": 20000, "y": 9.7487},
//         {"x": 40000, "y": 9.6879},
//         {"x": 60000, "y": 9.6879},
//         {"x": 80000, "y": 9.5682},
//     ], 
// }