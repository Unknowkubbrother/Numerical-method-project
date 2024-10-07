"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conjugate = exports.guassseidel = exports.jacobi = exports.choleskydecomposition = exports.ludecomposition = exports.matrixInversion = exports.gaussJordan = exports.gaussElimination = exports.cramer = void 0;
const cramer_1 = require("../functions/linearMethods/cramer");
const gaussElimination_1 = require("../functions/linearMethods/gaussElimination");
const gaussJordan_1 = require("../functions/linearMethods/gaussJordan");
const matrixInversion_1 = require("../functions/linearMethods/matrixInversion");
const Ludecomposition_1 = require("../functions/linearMethods/Ludecomposition");
const Choleskydecomposition_1 = require("../functions/linearMethods/Choleskydecomposition");
const Jacobi_1 = require("../functions/linearMethods/Jacobi");
const guassseidel_1 = require("../functions/linearMethods/guassseidel");
const conjugate_1 = require("../functions/linearMethods/conjugate");
const cramer = async (req, res) => {
    try {
        // {
        //     "matrixA": [[2,1],[1,-1]],
        //     "arrB": [4,-1]
        // }
        // {
        //     "matrixA": [[4,-4,0],[-1,4,-2],[0,-2,4]],
        //     "arrB": [400,400,400]
        // }
        const { matrixA, arrB } = req.body;
        const result = (0, cramer_1.CramerMethod)(matrixA, arrB);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.cramer = cramer;
const gaussElimination = async (req, res) => {
    try {
        const { matrixA, arrB } = req.body;
        const result = (0, gaussElimination_1.GaussEliminationMethod)(matrixA, arrB);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.gaussElimination = gaussElimination;
const gaussJordan = async (req, res) => {
    try {
        const { matrixA, arrB } = req.body;
        let result = (0, gaussJordan_1.GaussJordanMethod)(matrixA, arrB);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.gaussJordan = gaussJordan;
const matrixInversion = async (req, res) => {
    try {
        const { matrixA, arrB } = req.body;
        let result = (0, matrixInversion_1.MatrixInversionMethod)(matrixA, arrB);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.matrixInversion = matrixInversion;
const ludecomposition = async (req, res) => {
    try {
        const { matrixA, arrB } = req.body;
        let result = (0, Ludecomposition_1.LudecompositionMethod)(matrixA, arrB);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.ludecomposition = ludecomposition;
const choleskydecomposition = async (req, res) => {
    try {
        const { matrixA, arrB } = req.body;
        let result = (0, Choleskydecomposition_1.CholeskydecompositionMethod)(matrixA, arrB);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.choleskydecomposition = choleskydecomposition;
const jacobi = async (req, res) => {
    try {
        const { matrixA, arrB, initialX, errorFactor } = req.body;
        let result = (0, Jacobi_1.JacobiMethod)(matrixA, arrB, initialX, errorFactor);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.jacobi = jacobi;
const guassseidel = async (req, res) => {
    try {
        const { matrixA, arrB, initialX, errorFactor } = req.body;
        let result = (0, guassseidel_1.GaussSeiDelMethod)(matrixA, arrB, initialX, errorFactor);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.guassseidel = guassseidel;
const conjugate = async (req, res) => {
    try {
        const { matrixA, arrB, initialX, errorFactor } = req.body;
        let result = (0, conjugate_1.ConjugateMethods)(matrixA, arrB, initialX, errorFactor);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.conjugate = conjugate;
//# sourceMappingURL=LinearAlgebraicEquation.js.map