"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
exports.default = (router) => {
    router.get('/auth/register', authentication_1.register);
};
//# sourceMappingURL=authentication.js.map