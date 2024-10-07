"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HWRootMethods_1 = require("../controllers/HWRootMethods");
exports.default = (router) => {
    router.post('/numerical/HW1', HWRootMethods_1.HW1);
    router.post('/numerical/HW2', HWRootMethods_1.HW2);
    router.post('/numerical/HW3', HWRootMethods_1.HW3);
    router.post('/numerical/HW5', HWRootMethods_1.HW5);
    router.post('/numerical/HW6', HWRootMethods_1.HW6);
    router.post('/numerical/onepoint', HWRootMethods_1.HwOnePoint);
    router.post('/numerical/HW3NEWTON', HWRootMethods_1.Hw3Newton);
    router.post('/numerical/HW3Secant', HWRootMethods_1.HW3Secant);
};
//# sourceMappingURL=HWRootMethods.js.map