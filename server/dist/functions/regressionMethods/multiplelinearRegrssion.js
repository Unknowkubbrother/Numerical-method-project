"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleLinearRegressionMethods = multipleLinearRegressionMethods;
const math_1 = __importDefault(require("../../lib/math"));
function multipleLinearRegressionMethods(x, points) {
    const result = {
        result: 0,
        martrixX: [],
        arrY: [],
        arrA: [],
        statusCode: 400
    };
    let K = points[0].x.length;
    let n = points.length;
    const xixjSumMemory = {};
    const getXiXjSum = (i, j) => {
        let key = `${i}-${j}`;
        let key2 = `${j}-${i}`;
        if (xixjSumMemory[key])
            return xixjSumMemory[key];
        if (xixjSumMemory[key2])
            return xixjSumMemory[key2];
        let sum = 0;
        for (let k = 0; k < n; k++) {
            sum += (i != 0 ? points[k].x[i - 1] : 1) * (j != 0 ? points[k].x[j - 1] : 1);
        }
        xixjSumMemory[key] = sum;
        xixjSumMemory[key2] = sum;
        return sum;
    };
    const matrixX = [];
    const arrY = [];
    for (let i = 0; i < K + 1; i++) {
        matrixX[i] = [];
        for (let j = 0; j < K + 1; j++) {
            if (i == 0 && j == 0) {
                matrixX[i][j] = n;
                continue;
            }
            matrixX[i][j] = getXiXjSum(i, j);
        }
        arrY[i] = 0;
        for (let j = 0; j < points.length; j++) {
            arrY[i] += (i != 0 ? points[j].x[i - 1] : 1) * points[j].y;
        }
    }
    let arrA = math_1.default.multiply(math_1.default.inv(matrixX), arrY);
    for (let i = 0; i < K + 1; i++) {
        result.result += (i != 0 ? x[i - 1] : 1) * arrA[i];
    }
    result.result = math_1.default.round(result.result, 6);
    result.martrixX = math_1.default.round(matrixX, 6);
    result.arrY = math_1.default.round(arrY, 6);
    result.arrA = math_1.default.round(arrA, 6);
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
//# sourceMappingURL=multiplelinearRegrssion.js.map