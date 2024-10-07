"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RootOfEquation_1 = require("../controllers/RootOfEquation");
exports.default = (router) => {
    router.post('/root/graphical', RootOfEquation_1.graphical);
    router.post('/root/bisection', RootOfEquation_1.bisection);
    router.post('/root/falsePosition', RootOfEquation_1.falsePosition);
    router.post('/root/onePoint', RootOfEquation_1.onePoint);
    router.post('/root/newTon', RootOfEquation_1.newTon);
    router.post('/root/seant', RootOfEquation_1.secant);
};
//# sourceMappingURL=rootMethods.js.map