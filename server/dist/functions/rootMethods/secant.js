"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecantMethod = SecantMethod;
const math_1 = __importDefault(require("../../lib/math"));
function SecantMethod(xInitial0, xInitial1, func, errorFactor) {
    let result = {
        result: {
            xi_1: 0,
            xi: 0,
        },
        iter: 0,
        iterations: [],
        statusCode: 400
    };
    if (!func || func.trim().length == 0) {
        result.error = "Function is required";
        return result;
    }
    if (errorFactor <= 0) {
        result.error = "errorFactor must be greater than 0";
        return result;
    }
    let x0 = xInitial0;
    let x1 = xInitial1;
    let error;
    let oldX;
    const calFunc = (func, x) => {
        return math_1.default.evaluate(func, { x: x });
    };
    const calX1 = (x0, x1, func) => {
        return x1 - ((calFunc(func, x1) * (x0 - x1)) / (calFunc(func, x0) - calFunc(func, x1)));
    };
    do {
        oldX = x1;
        x1 = calX1(x0, x1, func);
        error = math_1.default.abs(x1 - oldX);
        x0 = oldX;
        result.iter++;
        result.iterations.push({ xi_1: x1, xi: oldX, error: error });
    } while (error != 0 && error > errorFactor);
    result.result = {
        xi_1: result.iterations[result.iterations.length - 1].xi_1,
        xi: result.iterations[result.iterations.length - 1].xi,
        error: result.iterations[result.iterations.length - 1].error
    };
    result.statusCode = 200;
    return result;
}
//# sourceMappingURL=secant.js.map