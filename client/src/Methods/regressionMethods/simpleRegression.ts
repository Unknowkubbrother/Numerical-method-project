import {multiply,inv,round,pow} from 'mathjs';
import {problemCreate} from '../../Api/problem';


export interface simpleRegressionRequest {
    M : number,
    x: number[],
    points: {
        x:number,
        y:number
    }[]
}

export interface simpleRegressionResponse {
    result: number[];
    martrixX: number[][];
    iterations: {
        x: number;
        y: number;
    }[];
    arrY: number[];
    arrA: number[];
    error?: string;
    statusCode: number;
}


export function simpleRegressionMethods( M : number , x:number[], points: {x:number, y:number}[]) : simpleRegressionResponse{

    const result: simpleRegressionResponse = { 
        result: [],
        martrixX: [],
        arrY: [],
        arrA: [],
        iterations: [],
        statusCode: 400
    };

    try{
        const n = points.length;
        const xSumPowerMemory : number[]  = [];

        const getXPow = (pow : number) => {
            if (xSumPowerMemory[pow]) return xSumPowerMemory[pow];
            let sum = 0;
            for (let i = 0; i < n; i++){
                sum += Math.pow(points[i].x, pow);
            }
            xSumPowerMemory[pow] = sum;
            return sum; 
        }

        const matrixX : number[][] = [];
        const arrY : number[] = [];
        for (let i = 0; i < M + 1; i++){
            matrixX[i] = [];
            for (let j = 0; j < M + 1; j++){
                if (i == 0 && j == 0){
                    matrixX[i][j] = n;
                    continue;
                }

                matrixX[i][j] = getXPow(i + j);
            }

            arrY[i] = 0;
            for(let j = 0 ; j < points.length; j++){
                arrY[i] += Number(pow(points[j].x, i)) * points[j].y;
            }

        }

        const arrA : number[] = multiply(inv(matrixX), arrY);

        for(let xi=0;xi<x.length;xi++){
            result.result[xi] = 0;
            for (let i = 0; i <  M + 1; i++){
                result.result[xi] += arrA[i] * Number(pow(x[xi], i));
            }
            result.iterations.push({x: x[xi], y: result.result[xi]});
        }

        result.result = round(result.result, 6);
        result.martrixX = round(matrixX, 6);
        result.arrY = round(arrY, 6);
        result.arrA = round(arrA, 6);


        result.statusCode = 200;

        problemCreate({
            type: "Regression",
            solution: "simple",
            input: {
                "x" : x,
                "points" : points,
                "M" : M
            },
            // output: result
        });

        return result;
    }catch(e){
        result.error = "failed request";
        result.statusCode = 400;
        return result;
    }

}

// {
//     "M": 2,
//     "x": 65, 
//     "points": [
//         {"x": 10, "y": 5},
//         {"x": 15, "y": 9},
//         {"x": 20, "y": 15},
//         {"x": 30, "y": 18},
//         {"x": 40, "y": 22},
//         {"x": 50, "y": 30},
//         {"x": 60, "y" : 35},
//         {"x": 70, "y" : 38},
//         {"x": 80, "y": 43}
//     ]
// }