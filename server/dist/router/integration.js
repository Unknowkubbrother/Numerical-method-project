"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const integration_1 = require("../controllers/integration");
exports.default = (router) => {
    router.post('/interpolation/singtrapezoidal', integration_1.SingTrapezoidal);
    router.post('/interpolation/compositetrapezoidal', integration_1.CompositeTrapezoidal);
    router.post('/interpolation/simpson', integration_1.Simpson);
    router.post('/interpolation/compositesimpson', integration_1.CompositeSimpson);
};
//# sourceMappingURL=integration.js.map