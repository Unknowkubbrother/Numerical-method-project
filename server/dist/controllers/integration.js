"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeSimpson = exports.Simpson = exports.CompositeTrapezoidal = exports.SingTrapezoidal = void 0;
const SingTrapezoidal_1 = require("../functions/integration/SingTrapezoidal");
const CompositeTrapezoidal_1 = require("../functions/integration/CompositeTrapezoidal");
const Simpson_1 = require("../functions/integration/Simpson");
const CompositeSimpson_1 = require("../functions/integration/CompositeSimpson");
const SingTrapezoidal = async (req, res) => {
    try {
        const { xStart, xEnd, equation } = req.body;
        let result = (0, SingTrapezoidal_1.SingTrapezoidalMethods)(xStart, xEnd, equation);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.SingTrapezoidal = SingTrapezoidal;
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