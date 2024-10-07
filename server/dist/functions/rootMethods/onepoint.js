"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnepointMethod = OnepointMethod;
const math_1 = __importDefault(require("../../lib/math"));
function OnepointMethod(xInitial, func, errorFactor) {
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
    let x = xInitial;
    let oldX;
    let error;
    const calFunc = (func, x) => {
        return math_1.default.evaluate(func, { x: x });
    };
    while (true) {
        oldX = x;
        x = calFunc(func, oldX);
        result.iter++;
        error = math_1.default.abs(x - oldX);
        if (x !== Infinity && x !== -Infinity) {
            result.iterations.push({ x: oldX, y: x, error: error });
        }
        else {
            result.iterations.push({ x: "infinity", y: "infinity", error: "NaN" });
        }
        if (error == 0 || error < errorFactor || x == Infinity || x == -Infinity) {
            break;
        }
    }
    result.result = {
        x: result.iterations[result.iterations.length - 1].x,
        y: result.iterations[result.iterations.length - 1].y,
        error: result.iterations[result.iterations.length - 1].error
    };
    result.statusCode = 200;
    return result;
}
//# sourceMappingURL=onepoint.js.map