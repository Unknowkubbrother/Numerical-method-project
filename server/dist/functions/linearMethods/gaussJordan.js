"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaussJordanMethod = GaussJordanMethod;
const math_1 = __importDefault(require("../../lib/math"));
function GaussJordanMethod(matrixA, arrB) {
    const result = {
        result: [],
        matrixAList: [],
        arrBList: [],
        statusCode: 400
    };
    for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixA.length; j++) {
            if (i > j) {
                if (matrixA[j][i] != 0) {
                    let tempMatrixA = [...matrixA[j]];
                    let temparrB = arrB[j];
                    tempMatrixA = tempMatrixA.map((value, index) => {
                        return (value / matrixA[j][j]) * matrixA[i][j];
                    });
                    temparrB = (temparrB / matrixA[j][j]) * matrixA[i][j];
                    matrixA[i] = matrixA[i].map((value, index) => {
                        return value - tempMatrixA[index];
                    });
                    arrB[i] = arrB[i] - temparrB;
                    result.matrixAList.push(matrixA.map((arr) => [...arr]));
                    result.arrBList.push([...arrB]);
                }
            }
        }
    }
    for (let i = matrixA.length - 1; i >= 0; i--) {
        for (let j = matrixA.length - 1; j >= 0; j--) {
            if (i < j) {
                if (matrixA[i][j] != 0) {
                    let tempMatrixA = [...matrixA[j]];
                    let temparrB = arrB[j];
                    tempMatrixA = tempMatrixA.map((value, index) => {
                        return (value / matrixA[j][j]) * matrixA[i][j];
                    });
                    temparrB = (temparrB / matrixA[j][j]) * matrixA[i][j];
                    matrixA[i] = matrixA[i].map((value, index) => {
                        return value - tempMatrixA[index];
                    });
                    arrB[i] = arrB[i] - temparrB;
                    result.matrixAList.push(matrixA.map((arr) => [...arr]));
                    result.arrBList.push([...arrB]);
                }
            }
        }
    }
    for (let i = 0; i < matrixA.length; i++) {
        result.result[i] = arrB[i] / matrixA[i][i];
        result.result[i] = math_1.default.round(result.result[i], 6);
    }
    result.statusCode = 200;
    return result;
}
//# sourceMappingURL=gaussJordan.js.map