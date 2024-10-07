"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.falsePositionMethod = falsePositionMethod;
const math_1 = __importDefault(require("../../lib/math"));
function falsePositionMethod(xStart, xEnd, func, errorFactor) {
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
    if (xStart >= xEnd) {
        result.error = "xStart must be less than xEnd";
        return result;
    }
    if (errorFactor <= 0) {
        result.error = "errorFactor must be greater than 0";
        return result;
    }
    let xL = xStart;
    let xR = xEnd;
    let x1;
    let oldX1 = 0;
    let funcX1;
    const MAX_ITER = 1000;
    while (result.iter < MAX_ITER) {
        let funcL = math_1.default.evaluate(func, { x: xL });
        let funcR = math_1.default.evaluate(func, { x: xR });
        x1 = (xL * funcR - xR * funcL) / (funcR - funcL);
        let error = math_1.default.abs(x1 - oldX1);
        funcX1 = math_1.default.evaluate(func, { x: x1 });
        if (error == 0 || error < errorFactor) {
            break;
        }
        result.iter++;
        result.iterations.push({ x: x1, y: funcX1, error: error });
        if (funcL * funcX1 < 0) {
            xR = x1;
        }
        else {
            xL = x1;
        }
        oldX1 = x1;
    }
    result.result = {
        x: result.iterations[result.iterations.length - 1].x,
        y: result.iterations[result.iterations.length - 1].y,
        error: result.iterations[result.iterations.length - 1].error
    };
    result.statusCode = 200;
    return result;
}
//# sourceMappingURL=falsePosition.js.map