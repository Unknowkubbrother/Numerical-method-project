"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeSimpson = exports.Simpson = exports.CompositeTrapezoidal = exports.Trapezoidal = void 0;
const Trapezoidal_1 = require("../functions/integration/Trapezoidal");
const CompositeTrapezoidal_1 = require("../functions/integration/CompositeTrapezoidal");
const Simpson_1 = require("../functions/integration/Simpson");
const CompositeSimpson_1 = require("../functions/integration/CompositeSimpson");
const Trapezoidal = async (req, res) => {
    try {
        const { a, b, equation } = req.body;
        let result = (0, Trapezoidal_1.TrapezoidalMethods)(a, b, equation);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.Trapezoidal = Trapezoidal;
const CompositeTrapezoidal = async (req, res) => {
    try {
        const { xStart, xEnd, n, equation } = req.body;
        let result = (0, CompositeTrapezoidal_1.CompositeTrapezoidalMethods)(xStart, xEnd, n, equation);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.CompositeTrapezoidal = CompositeTrapezoidal;
const Simpson = async (req, res) => {
    try {
        const { xStart, xEnd, equation } = req.body;
        let result = (0, Simpson_1.SimpsonMethods)(xStart, xEnd, equation);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.Simpson = Simpson;
const CompositeSimpson = async (req, res) => {
    try {
        const { xStart, xEnd, n, equation } = req.body;
        let result = (0, CompositeSimpson_1.CompositeSimpsonMethods)(xStart, xEnd, n, equation);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.CompositeSimpson = CompositeSimpson;
//# sourceMappingURL=integration.js.map