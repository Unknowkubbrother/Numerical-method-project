"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CramerMethod = CramerMethod;
const math_1 = __importDefault(require("../../lib/math"));
function CramerMethod(matrixA, arrB) {
    const result = {
        result: [],
        matrixAList: [],
        detA: 0,
        detAi: [],
        statusCode: 400
    };
    const detA = math_1.default.det(matrixA);
    if (detA === 0) {
        result.error = "Determinant of matrix A is 0";
        return result;
    }
    result.detA = detA;
    for (let i = 0; i < matrixA.length; i++) {
        let tempMatrix = matrixA.map((arr) => [...arr]);
        for (let j = 0; j < matrixA.length; j++) {
            tempMatrix[j][i] = arrB[j];
        }
        result.matrixAList.push(tempMatrix);
    }
    for (let i = 0; i < result.matrixAList.length; i++) {
        result.detAi.push(math_1.default.det(result.matrixAList[i]));
        result.result.push(result.detAi[i] / detA);
    }
    result.statusCode = 200;
    return result;
}
//# sourceMappingURL=cramer.js.map