"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingTrapezoidalMethods = SingTrapezoidalMethods;
const math_1 = __importDefault(require("../../lib/math"));
function SingTrapezoidalMethods(xStart, xEnd, equation) {
    const result = {
        result: 0,
        statusCode: 400
    };
    const h = (xEnd - xStart);
    const fx = (x) => {
        return math_1.default.evaluate(equation, { x });
    };
    result.result = (h / 2) * (fx(xStart) + fx(xEnd));
    result.statusCode = 200;
    return result;
}
// {
//     "xStart" : 2,
//     "xEnd" : 8,
//     "equation": "4x^5-3x^4+x^3-6x+2"
// }
//# sourceMappingURL=SingTrapezoidal.js.map