import math from '../../lib/math';

export interface multipleLinearRegressionRequest {
    x: number[][],
    points: {
        x:number[],
        y:number
    }[]
}

export interface multipleLinearRegressionResponse {
    result: number[];
    martrixX: number[][];
    arrY: number[];
    arrA: number[];
    error?: string;
    statusCode: number;
}


export function multipleLinearRegressionMethods( x:number[][], points: {x:number[], y:number}[]) : multipleLinearRegressionResponse{

    const result: multipleLinearRegressionResponse = { 
        result: [],
        martrixX: [],
        arrY: [],
        arrA: [],
        statusCode: 400
    };

    let K = points[0].x.length;
    let n = points.length;
    const xixjSumMemory : { [key: string]: number } = {};
    const getXiXjSum = (i : number , j : number) => {
        let key = `${i}-${j}`;
        let key2 = `${j}-${i}`;
        if (xixjSumMemory[key]) return xixjSumMemory[key];
        if (xixjSumMemory[key2]) return xixjSumMemory[key2];

        let sum = 0;
        for (let k = 0; k < n; k++){
            sum += (i != 0 ? points[k].x[i - 1] : 1) * (j != 0 ? points[k].x[j - 1] : 1);
        }

        xixjSumMemory[key] = sum;
        xixjSumMemory[key2] = sum;
        return sum; 
    }


    const matrixX : number[][] = [];
    const arrY : number[] = [];
    for (let i = 0; i < K + 1; i++){
        matrixX[i] = [];
        for (let j = 0; j < K + 1; j++){
            if (i == 0 && j == 0){
                matrixX[i][j] = n;
                continue;
            }

            matrixX[i][j] = getXiXjSum(i, j);
        }

        arrY[i] = 0;
        for(let j = 0 ; j < points.length; j++){
            arrY[i] += (i != 0 ? points[j].x[i - 1] : 1) * points[j].y;
        }

    }

    let arrA : number[] = math.multiply(math.inv(matrixX), arrY);

    for(let xi=0;xi<x.length;xi++){
        result.result[xi] = 0;
        for (let i = 0; i <  K+1; i++){
            result.result[xi] += (i != 0 ? x[xi][i-1] : 1) * arrA[i];
        }
    }

    result.result = math.round(result.result, 6);
    result.martrixX = math.round(matrixX, 6);
    result.arrY = math.round(arrY, 6);
    result.arrA = math.round(arrA, 6);


    result.statusCode = 200;

    return result;

}

// {
//     "x": [1,2], 
//     "points": [
//         {"x": [0,0], "y": 1},
//         {"x": [0,1], "y": 4},
//         {"x": [1,0], "y": 3},
//         {"x": [1,2], "y": 9},
//         {"x": [2,1], "y": 8},
//         {"x": [2,2], "y": 11}
//     ]
// }

// {
//     "x": [1,2,3], 
//     "points": [
//         {"x": [1,0,1], "y": 4},
//         {"x": [0,1,3], "y": -5},
//         {"x": [2,4,1], "y": -6},
//         {"x": [3,2,2], "y": 0},
//         {"x": [4,1,5], "y": -1},
//         {"x": [2,3,3], "y": -7},
//         {"x": [1,6,4], "y": -20}
//     ]
// }