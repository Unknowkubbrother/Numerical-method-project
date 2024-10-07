"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleLinearRegression = exports.simpleRegression = void 0;
const simpleRegression_1 = require("../functions/regressionMethods/simpleRegression");
const multiplelinearRegrssion_1 = require("../functions/regressionMethods/multiplelinearRegrssion");
const simpleRegression = async (req, res) => {
    try {
        const { M, x, points } = req.body;
        let result = (0, simpleRegression_1.simpleRegressionMethods)(M, x, points);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.simpleRegression = simpleRegression;
const multipleLinearRegression = async (req, res) => {
    try {
        const { x, points } = req.body;
        let result = (0, multiplelinearRegrssion_1.multipleLinearRegressionMethods)(x, points);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.multipleLinearRegression = multipleLinearRegression;
//# sourceMappingURL=regression.js.map