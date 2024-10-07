"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secant = exports.newTon = exports.onePoint = exports.falsePosition = exports.bisection = exports.graphical = void 0;
const graphical_1 = require("../functions/rootMethods/graphical");
const bisection_1 = require("../functions/rootMethods/bisection");
const falsePosition_1 = require("../functions/rootMethods/falsePosition");
const onepoint_1 = require("../functions/rootMethods/onepoint");
const newton_1 = require("../functions/rootMethods/newton");
const secant_1 = require("../functions/rootMethods/secant");
const graphical = async (req, res) => {
    try {
        // {
        //     "xStart" : 0,
        //     "xEnd":  9,
        //     "func": "(e^(-x/4.00))(2-x)-1",
        //     "errorFactor": 0.001
        // }
        const { xStart, xEnd, func, errorFactor } = req.body;
        const result = (0, graphical_1.graphicalMethod)(xStart, xEnd, func, errorFactor);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.graphical = graphical;
const bisection = async (req, res) => {
    try {
        const { xStart, xEnd, func, errorFactor } = req.body;
        const result = (0, bisection_1.bisectionMethod)(xStart, xEnd, func, errorFactor);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.bisection = bisection;
const falsePosition = async (req, res) => {
    try {
        const { xStart, xEnd, func, errorFactor } = req.body;
        const result = (0, falsePosition_1.falsePositionMethod)(xStart, xEnd, func, errorFactor);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.falsePosition = falsePosition;
const onePoint = async (req, res) => {
    try {
        const { xInitial, func, errorFactor } = req.body;
        const result = (0, onepoint_1.OnepointMethod)(xInitial, func, errorFactor);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.onePoint = onePoint;
const newTon = async (req, res) => {
    try {
        const { xInitial, func, errorFactor } = req.body;
        const result = (0, newton_1.NewTonMethod)(xInitial, func, errorFactor);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.newTon = newTon;
const secant = async (req, res) => {
    try {
        const { xInitial0, xInitial1, func, errorFactor } = req.body;
        const result = (0, secant_1.SecantMethod)(xInitial0, xInitial1, func, errorFactor);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus;
    }
};
exports.secant = secant;
//# sourceMappingURL=RootOfEquation.js.map