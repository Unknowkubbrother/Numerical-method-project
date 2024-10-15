"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeTrapezoidalMethods = CompositeTrapezoidalMethods;
const math_1 = __importDefault(require("../../lib/math"));
function CompositeTrapezoidalMethods(xStart, xEnd, n, equation) {
    const result = {
        result: 0,
        statusCode: 400
    };
    const h = (xEnd - xStart) / n;
    const fx = (x) => {
        return math_1.default.evaluate(equation, { x });
    };
    const iteration = [];
    for (let i = 0; i <= n; i++) {
        iteration.push({ x: xStart + i * h, y: fx(xStart + i * h) });
    }
    let sum = 0;
    for (let i = 1; i < n; i++) {
        sum += fx(xStart + i * h);
    }
    result.result = (h / 2) * (fx(xStart) + 2 * sum + fx(xEnd));
    result.statusCode = 200;
    return result;
}
// {
//     "xStart" : 2,
//     "xEnd" : 8,
//     "n": 2,
//     "equation": "4x^5-3x^4+x^3-6x+2"
// }
//# sourceMappingURL=CompositeTrapezoidal.js.map