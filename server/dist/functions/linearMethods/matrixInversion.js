"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixInversionMethod = MatrixInversionMethod;
const math_1 = __importDefault(require("../../lib/math"));
function MatrixInversionMethod(matrixA, arrB) {
    const result = {
        result: [],
        matrixAInverse: [],
        statusCode: 400
    };
    let matrixAInverse = math_1.default.inv(matrixA);
    result.matrixAInverse = matrixAInverse.map((arr) => arr.map((value) => math_1.default.round(value, 6)));
    for (let i = 0; i < arrB.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrixA.length; j++) {
            sum += matrixAInverse[i][j] * arrB[j];
        }
        result.result.push(math_1.default.round(sum, 6));
    }
    result.statusCode = 200;
    return result;
}
//# sourceMappingURL=matrixInversion.js.map