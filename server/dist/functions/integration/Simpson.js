"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpsonMethods = SimpsonMethods;
const math_1 = __importDefault(require("../../lib/math"));
function SimpsonMethods(xStart, xEnd, equation) {
    const result = {
        result: 0,
        statusCode: 400
    };
    const h = (xEnd - xStart) / 2;
    const fx = (x) => {
        return math_1.default.evaluate(equation, { x });
    };
    result.result = (h / 3) * (fx(xStart) + (4 * fx(xStart + h)) + fx(xEnd));
    result.statusCode = 200;
    return result;
}
// {
//     "xStart" : -1,
//     "xEnd" : 2,
//     "equation": "x^7+2x^3-1"
// }
//# sourceMappingURL=Simpson.js.map