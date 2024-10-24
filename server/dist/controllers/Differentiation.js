"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Differentiation = void 0;
const Differentiation_1 = require("../functions/Differentiation/Differentiation");
const Differentiation = async (req, res) => {
    try {
        let { x, h, equation, order, oh, direction } = req.body;
        let result = (0, Differentiation_1.DifferentiationMethods)(x, h, equation, order, oh, direction);
        return res.status(result.statusCode).json(result).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.Differentiation = Differentiation;
//# sourceMappingURL=Differentiation.js.map