"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeSimpsonMethods = CompositeSimpsonMethods;
const math_1 = __importDefault(require("../../lib/math"));
function CompositeSimpsonMethods(xStart, xEnd, n, equation) {
    const result = {
        result: 0,
        statusCode: 400
    };
    const h = (xEnd - xStart) / (2 * n);
    const fx = (x) => {
        return math_1.default.evaluate(equation, { x });
    };
    const iteration = [];
    for (let i = 0; i <= (2 * n); i++) {
        iteration.push({ x: xStart + i * h, y: fx(xStart + i * h) });
    }
    console.log(iteration);
    let sum = 0;
    for (let i = 1; i < (2 * n); i++) {
        if (i % 2 == 0) {
            sum += iteration[i].y * 2;
        }
        else {
            sum += iteration[i].y * 4;
        }
    }
    result.result = (h / 3) * (fx(xStart) + sum + fx(xEnd));
    result.statusCode = 200;
    return result;
}
// {
//     "xStart" : -1,
//     "xEnd" : 2,
//     "n": 2,
//     "equation": "x^7+2x^3-1"
// }
//# sourceMappingURL=CompositeSimpson.js.map