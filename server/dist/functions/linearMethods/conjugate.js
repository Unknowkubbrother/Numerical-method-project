"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConjugateMethods = ConjugateMethods;
const math_1 = __importDefault(require("../../lib/math"));
function ConjugateMethods(matrixA, arrB, initialX, errorFactor) {
    const result = {
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
    const calculateError = (arrR) => {
        return math_1.default.sqrt(math_1.default.multiply(math_1.default.transpose(arrR), arrR));
    };
    let arrX = Array(initialX.length).fill(0);
    let arrR = math_1.default.subtract(math_1.default.multiply(matrixA, arrX), arrB);
    let arrD = math_1.default.multiply(arrR, -1);
    let iterations = 0;
    let error;
    do {
        iterations++;
        let lamda = -1 * (math_1.default.multiply(math_1.default.transpose(arrD), arrR) / math_1.default.multiply(math_1.default.multiply(math_1.default.transpose(arrD), matrixA), arrD));
        arrX = math_1.default.add(arrX, math_1.default.multiply(lamda, arrD));
        arrR = math_1.default.subtract(math_1.default.multiply(matrixA, arrX), arrB);
        let alpha = math_1.default.multiply(math_1.default.multiply(math_1.default.transpose(arrR), matrixA), arrD) / math_1.default.multiply(math_1.default.multiply(math_1.default.transpose(arrD), matrixA), arrD);
        arrD = math_1.default.subtract(arrR, math_1.default.multiply(alpha, arrD));
        error = calculateError(arrR);
        result.iterations.push({
            iter: iterations,
            lamda: math_1.default.round(lamda, 6),
            x: math_1.default.round(arrX, 6),
            r: math_1.default.round(arrR, 6),
            error: math_1.default.round(error, 6),
            alpha: math_1.default.round(alpha, 6),
            d: math_1.default.round(arrD, 6)
        });
    } while (error >= errorFactor);
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
//# sourceMappingURL=conjugate.js.map