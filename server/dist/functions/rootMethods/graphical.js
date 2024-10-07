"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphicalMethod = graphicalMethod;
const math_1 = __importDefault(require("../../lib/math"));
function graphicalMethod(xStart, xEnd, func, errorFactor) {
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
    let step = 1;
    let x = xStart;
    const MAX_ITER = 1000;
    let y;
    let oldY = math_1.default.evaluate(func, { x: Number(x) });
    while (result.iter < MAX_ITER) {
        result.iter++;
        y = math_1.default.evaluate(func, { x: Number(x) });
        result.iterations.push({ x: Number(x), y: y, error: math_1.default.abs(y) });
        if (y == 0 || math_1.default.abs(y) < errorFactor) {
            break;
        }
        if (oldY * y < 0) {
            x -= step;
            step /= 10;
            y = math_1.default.evaluate(func, { x: Number(x) });
        }
        x += step;
        if (x > xEnd) {
            // x = xEnd;
            break;
        }
        oldY = y;
    }
    result.result = {
        x: x,
        y: y,
        error: math_1.default.abs(y)
    };
    result.statusCode = 200;
    return result;
}
//# sourceMappingURL=graphical.js.map