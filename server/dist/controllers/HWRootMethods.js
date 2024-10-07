"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HW3Secant = exports.Hw3Newton = exports.HwOnePoint = exports.HW6 = exports.HW5 = exports.HW3 = exports.HW2 = exports.HW1 = void 0;
const math_1 = __importDefault(require("../lib/math"));
const HW1 = async (req, res) => {
    try {
        // {
        //     "xStart" :  0,
        //     "xEnd":  10.0,
        //     "func": "43x - 180",
        //     "errorFactor": 0.000001
        // }
        let { xStart, xEnd, func, errorFactor } = req.body;
        let result = {
            result: {
                x: 0,
                y: 0,
            },
            iter: 0,
            iterations: [],
        };
        const checkSign = (y) => y < 0;
        let x = xStart;
        let y;
        let tempY = math_1.default.evaluate(func, { x: Number(x) });
        let step = 1;
        let oldX = 0;
        while (x <= xEnd) {
            y = math_1.default.evaluate(func, { x: Number(x) });
            result.iter++;
            result.iterations.push({ x: x, y: y });
            // console.log(x,y)
            if (checkSign(y) != checkSign(tempY)) {
                xEnd = x;
                x = x - step;
                tempY = math_1.default.evaluate(func, { x: Number(x) });
                step = Number(errorFactor);
                let error = math_1.default.abs(x - oldX);
                console.log(x, oldX, y, error);
                if (error == 0 || error < errorFactor) {
                    break;
                }
                oldX = x;
            }
            x += step;
        }
        result.result = {
            x: result.iterations[result.iterations.length - 1].x,
            y: result.iterations[result.iterations.length - 1].y,
        };
        return res.status(200).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.HW1 = HW1;
const HW2 = async (req, res) => {
    try {
        // {
        //     "xStart" :  1.5,
        //     "xEnd":  2.0,
        //     "func": "x^4 - 13",
        //     "errorFactor": 0.000001
        // }
        const { xStart, xEnd, func, errorFactor } = req.body;
        let result = {
            result: {
                x: 0,
                y: 0,
            },
            iter: 0,
            iterations: [],
        };
        let xL = xStart;
        let xR = xEnd;
        let oldXm = 0;
        let xM;
        let funcM;
        while (true) {
            xM = (xL + xR) / 2;
            let error = math_1.default.abs(xM - oldXm);
            funcM = math_1.default.evaluate(func, { x: Number(xM) });
            if (error == 0 || error < errorFactor) {
                break;
            }
            result.iter++;
            result.iterations.push({ x: Number(xM), y: funcM, error: error });
            let funcR = math_1.default.evaluate(func, { x: Number(xR) });
            if (funcM * funcR > 0) {
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
        };
        return res.status(200).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.HW2 = HW2;
const HW3 = async (req, res) => {
    try {
        // {
        //     "xStart" : 0,
        //     "xEnd":  1000000,
        //     "x": 38,
        //     "n" : 2,
        //     "errorFactor": 0.000001
        // }
        const { xStart, xEnd, x, n, errorFactor } = req.body;
        let xL = xStart;
        let xR = xEnd;
        const func = "x^n - num";
        let result = 0;
        let oldXm = 0;
        let xM;
        let funcM;
        let iter = 0;
        const calFunc = (x, num, n) => {
            return math_1.default.evaluate(func, { x: x, n: n, num: num });
        };
        while (true) {
            xM = (xL + xR) / 2;
            funcM = calFunc(xM, x, n);
            let error = math_1.default.abs(xM - oldXm);
            let funcR = calFunc(xR, x, n);
            if (funcM == 0 || error < Number(errorFactor)) {
                result = xM;
                break;
            }
            iter++;
            if (funcR * funcM > 0) {
                xR = xM;
            }
            else {
                xL = xM;
            }
            oldXm = xM;
        }
        return res
            .status(200)
            .json({
            result: Number(math_1.default.round(result, 4)),
        })
            .end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.HW3 = HW3;
const HW5 = async (req, res) => {
    try {
        // {
        //     "xStart" :  1.5,
        //     "xEnd":  2,
        //     "func": "x^4 - 13",
        //     "errorFactor": 0.000001
        // }
        const { xStart, xEnd, func, errorFactor } = req.body;
        let result = {
            result: {
                x: 0,
                y: 0,
            },
            iter: 0,
            iterations: [],
        };
        let xL = xStart;
        let xR = xEnd;
        let x1;
        let oldX1 = 0;
        let funcX1;
        while (true) {
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
            if (funcR * funcX1 > 0) {
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
        };
        return res.status(200).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.HW5 = HW5;
const HW6 = async (req, res) => {
    try {
        // {
        //     "xStart" : 0,
        //     "xEnd":  1000,
        //     "x": 38,
        //     "n" : 2,
        //     "errorFactor": 0.000001
        // }
        const { xStart, xEnd, x, n, errorFactor, } = req.body;
        let result = 0;
        let xL = xStart;
        let xR = xEnd;
        let oldX1 = 0;
        let x1;
        let funcX1;
        let func = "x^n-num";
        let iter = 0;
        const calFunc = (x, num, n) => {
            return math_1.default.evaluate(func, { x: x, n: n, num: num });
        };
        while (true) {
            let funcL = calFunc(xL, x, n);
            let funcR = calFunc(xR, x, n);
            x1 = (xL * funcR - xR * funcL) / (funcR - funcL);
            let error = math_1.default.abs(x1 - oldX1);
            funcX1 = calFunc(x1, x, n);
            if (error == 0 || error < Number(errorFactor)) {
                result = x1;
                break;
            }
            iter++;
            if (funcR * funcX1 > 0) {
                xR = x1;
            }
            else {
                xL = x1;
            }
            oldX1 = x1;
        }
        return res
            .status(200)
            .json({
            result: Number(math_1.default.round(result, 4)),
        })
            .end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.HW6 = HW6;
const HwOnePoint = async (req, res) => {
    try {
        // {
        //     "xStart" :  0,
        //     "func": "1/2*(x+7/x)",
        //     "errorFactor": 0.000001
        // }
        const { xStart, func, errorFactor } = req.body;
        // let diff1 = math.derivative(func, 'x').toString();
        // let diff2 = math.derivative(diff1, 'x').toString();
        // console.log(diff2,math.evaluate(diff2,{x: xStart}))
        let result = {
            result: {
                x: 0,
                y: 0,
            },
            iter: 0,
            iterations: [],
        };
        let x = xStart;
        let oldX;
        let error;
        const calFunc = (func, x) => {
            return (x == 0) ? 1 : math_1.default.evaluate(func, { x: x });
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
        return res.status(200).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.HwOnePoint = HwOnePoint;
const Hw3Newton = async (req, res) => {
    // {
    //   "xInital": 2,
    //   "func": "x^2 - 7",
    //   "errorFactor": 0.000001
    // }
    try {
        const { xInital, func, errorFactor } = req.body;
        let result = {
            result: {
                x: 0,
                y: 0,
            },
            iter: 0,
            iterations: [],
        };
        const calFuncdiff = (func, x) => {
            return math_1.default.derivative(func, 'x').evaluate({ x: x });
        };
        const calFunc = (func, x) => {
            return math_1.default.evaluate(func, { x: x });
        };
        let x = xInital;
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
        return res.status(200).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.Hw3Newton = Hw3Newton;
const HW3Secant = async (req, res) => {
    try {
        // {
        //   "xInital0": 0,
        //   "xInital1": 2,
        //   "func": "x^2 - 7",
        //   "errorFactor": 0.000001
        // }
        const { xInital0, xInital1, func, errorFactor } = req.body;
        let result = {
            result: {
                xi_1: 0,
                xi: 0,
            },
            iter: 0,
            iterations: [],
        };
        let x0 = xInital0;
        let x1 = xInital1;
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
        return res.status(200).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.HW3Secant = HW3Secant;
//# sourceMappingURL=HWRootMethods.js.map