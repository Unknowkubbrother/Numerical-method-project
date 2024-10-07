"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interpolation_1 = require("../controllers/Interpolation");
exports.default = (router) => {
    router.post('/interpolation/newton', Interpolation_1.newton);
    router.post('/interpolation/legrange', Interpolation_1.legrange);
    router.post('/interpolation/spline', Interpolation_1.spline);
};
//# sourceMappingURL=interpolationMethods.js.map