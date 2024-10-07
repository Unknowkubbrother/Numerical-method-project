"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spline = exports.legrange = exports.newton = void 0;
const NewtonDivided_1 = require("../functions/Interpolations/NewtonDivided");
const Lagrange_1 = require("../functions/Interpolations/Lagrange");
const spline_1 = require("../functions/Interpolations/spline");
const newton = async (req, res) => {
    try {
        const { x, points } = req.body;
        let result = (0, NewtonDivided_1.NewtonDividedMethods)(x, points);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.newton = newton;
const legrange = async (req, res) => {
    try {
        const { x, points } = req.body;
        let result = (0, Lagrange_1.LagrangeMethods)(x, points);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.legrange = legrange;
const spline = async (req, res) => {
    try {
        const { x, points, type } = req.body;
        let result = (0, spline_1.SplineMethods)(x, points, type);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.spline = spline;
//# sourceMappingURL=Interpolation.js.map