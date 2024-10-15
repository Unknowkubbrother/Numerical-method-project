"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferentiationMethods = DifferentiationMethods;
const math_1 = __importDefault(require("../../lib/math"));
function DifferentiationMethods(x, h, equation, type, oh) {
    const result = {
        result: {
            result: 0,
            error: 0
        },
        statusCode: 400
    };
    const fx = (x) => {
        return math_1.default.evaluate(equation, { x });
    };
    const diff = (equation, x, n) => {
        if (n == 0) {
            return math_1.default.evaluate(equation, { x });
        }
        const diffequation = math_1.default.derivative(equation, 'x').toString();
        return (diff(diffequation, x, n - 1));
    };
    const error = (count, result) => {
        return math_1.default.abs((diff(equation, x, count) - result) / diff(equation, x, count)) * 100;
    };
    if (type == "forward" && oh == "h") {
        result.result.result = (fx(x + h) - fx(x)) / h;
        result.result.error = error(1, result.result.result);
    }
    if (type == "backward" && oh == "h") {
        result.result.result = (fx(x) - fx(x - h)) / h;
        result.result.error = error(1, result.result.result);
    }
    if (type == "central" && oh == "h^2") {
        result.result.result = (fx(x + h) - fx(x - h)) / (2 * h);
        result.result.error = error(1, result.result.result);
    }
    if (type == "forward" && oh == "h^2") {
        result.result.result = ((-1 * fx(x + 3 * h)) + (4 * fx(x + 2 * h)) - (5 * fx(x + h)) + (2 * fx(x))) / (math_1.default.pow(h, 2));
        result.result.error = error(2, result.result.result);
    }
    if (type == "backward" && oh == "h^2") {
        result.result.result = ((2 * fx(x)) - (5 * fx(x - h)) + (4 * fx(x - 2 * h)) - (fx(x - 3 * h))) / (math_1.default.pow(h, 2));
        result.result.error = error(2, result.result.result);
    }
    if (type == "central" && oh == "h^4") {
        result.result.result = ((-1 * fx(x + 2 * h)) + (16 * fx(x + h)) - (30 * fx(x)) + (16 * fx(x - h)) - (fx(x - 2 * h))) / (12 * (math_1.default.pow(h, 2)));
        result.result.error = error(2, result.result.result);
    }
    result.statusCode = 200;
    return result;
}
// {
//     "x" : 2,
//     "h" : 0.25,
//     "equation": "e^x",
//     "type" : "forward",
//     "oh" : "h"
// }
// {
//     "x" : -2.5,
//     "h" : 0.1,
//     "equation": "e^(x/3)+x^2",
//     "type" : "backward",
//     "oh" : "h^2"
// }
//# sourceMappingURL=Differentiation.js.map