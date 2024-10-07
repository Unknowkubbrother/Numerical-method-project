"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaussSeiDelMethod = GaussSeiDelMethod;
function GaussSeiDelMethod(matrixA, arrB, initialX, errorFactor) {
    const result = {
        iter: 0,
        result: [],
        iterations: [],
        statusCode: 400
    };
    const calculateError = (newValue, oldValue) => {
        return Math.abs((newValue - oldValue));
    };
    const checkError = (arrX, arrXOld) => {
        for (let i = 0; i < arrX.length; i++) {
            if (calculateError(arrX[i], arrXOld[i]) >= errorFactor) {
                return true;
            }
        }
        return false;
    };
    let arrX = Array(initialX.length).fill(0);
    let arrXOld = Array(matrixA.length).fill(0);
    let iterations = 0;
    do {
        iterations++;
        arrXOld = arrX.map((x) => x);
        for (let i = 0; i < matrixA.length; i++) {
            let sum = arrB[i];
            let temp = arrX.map((x) => x);
            for (let j = 0; j < matrixA.length; j++) {
                if (i !== j) {
                    sum -= matrixA[i][j] * temp[j];
                }
            }
            arrX[i] = sum / matrixA[i][i];
        }
        result.iterations.push({
            iter: iterations,
            error: Array(matrixA.length).fill(0).map((_, index) => calculateError(arrX[index], arrXOld[index])),
            x: arrX.map((x) => x)
        });
    } while (checkError(arrX, arrXOld));
    result.iter = iterations;
    result.result = result.iterations.filter((iteration) => iteration.iter === iterations);
    result.statusCode = 200;
    return result;
}
// {
//     "matrixA": [[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]], 
//     "arrB": [12,17,14,7],
//     "initialX": [0,0,0,0],
//     "errorFactor": 0.000001
// }
//# sourceMappingURL=guassseidel.js.map