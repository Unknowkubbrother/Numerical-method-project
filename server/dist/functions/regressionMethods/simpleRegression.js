"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleRegressionMethods = simpleRegressionMethods;
const math_1 = __importDefault(require("../../lib/math"));
function simpleRegressionMethods(M, x, points) {
    const result = {
        result: 0,
        martrixX: [],
        arrY: [],
        arrA: [],
        statusCode: 400
    };
    let n = points.length;
    const xSumPowerMemory = [];
    const getXPow = (pow) => {
        if (xSumPowerMemory[pow])
            return xSumPowerMemory[pow];
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += Math.pow(points[i].x, pow);
        }
        xSumPowerMemory[pow] = sum;
        return sum;
    };
    const matrixX = [];
    const arrY = [];
    for (let i = 0; i < M + 1; i++) {
        matrixX[i] = [];
        for (let j = 0; j < M + 1; j++) {
            if (i == 0 && j == 0) {
                matrixX[i][j] = n;
                continue;
            }
            matrixX[i][j] = getXPow(i + j);
        }
        arrY[i] = 0;
        for (let j = 0; j < points.length; j++) {
            arrY[i] += math_1.default.pow(points[j].x, i) * points[j].y;
        }
    }
    let arrA = math_1.default.multiply(math_1.default.inv(matrixX), arrY);
    for (let i = 0; i < M + 1; i++) {
        result.result += arrA[i] * math_1.default.pow(x, i);
    }
    result.result = math_1.default.round(result.result, 6);
    result.martrixX = math_1.default.round(matrixX, 6);
    result.arrY = math_1.default.round(arrY, 6);
    result.arrA = math_1.default.round(arrA, 6);
    result.statusCode = 200;
    return result;
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
//# sourceMappingURL=simpleRegression.js.map