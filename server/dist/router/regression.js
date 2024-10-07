"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regression_1 = require("../controllers/regression");
exports.default = (router) => {
    router.post('/regression/simpleregression', regression_1.simpleRegression);
    router.post('/regression/multiplelinearregression', regression_1.multipleLinearRegression);
};
//# sourceMappingURL=regression.js.map