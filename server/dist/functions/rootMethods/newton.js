"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTonMethod = NewTonMethod;
const math_1 = __importDefault(require("../../lib/math"));
function NewTonMethod(xInitial, func, errorFactor) {
    let result = {
        result: {
            x: 0,
            y: 0
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
    const calFuncdiff = (func, x) => {
        return math_1.default.derivative(func, 'x').evaluate({ x: x });
    };
    const calFunc = (func, x) => {
        return math_1.default.evaluate(func, { x: x });
    };
    let x = xInitial;
    let error;
    let oldX;
    do {
        oldX = x;
        x = oldX - (calFunc(func, oldX) / calFuncdiff(func, oldX));
        error = math_1.default.abs(x - oldX);
        result.iter++;
        result.iterations.push({ x: oldX, y: x, error: error });
    } while (error != 0 && error > errorFactor);
    result.result = {
        x: result.iterations[result.iterations.length - 1].x,
        y: result.iterations[result.iterations.length - 1].y,
        error: result.iterations[result.iterations.length - 1].error
    };
    result.statusCode = 200;
    return result;
}
//# sourceMappingURL=newton.js.map