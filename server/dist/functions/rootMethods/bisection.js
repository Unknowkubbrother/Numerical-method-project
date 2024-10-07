"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bisectionMethod = bisectionMethod;
const math_1 = __importDefault(require("../../lib/math"));
function bisectionMethod(xStart, xEnd, func, errorFactor) {
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
    let oldXm = 0;
    let xM;
    let funcM;
    const MAX_ITER = 1000;
    while (result.iter < MAX_ITER) {
        xM = (xL + xR) / 2;
        let error = math_1.default.abs((xM - oldXm));
        funcM = math_1.default.evaluate(func, { x: Number(xM) });
        if (error == 0 || error < errorFactor) {
            break;
        }
        result.iter++;
        result.iterations.push({ x: Number(xM), y: funcM, error: error });
        let facR = math_1.default.evaluate(func, { x: Number(xR) });
        if (funcM * facR > 0) {
            xR = xM;
        }
        else {
            xL = xM;
        }
        oldXm = xM;
    }
    result.result = {
        x: result.iterations[result.iterations.length - 1].x,
        y: result.iterations[result.iterations.length - 1].y,
        error: result.iterations[result.iterations.length - 1].error
    };
    result.statusCode = 200;
    return result;
}
//# sourceMappingURL=bisection.js.map