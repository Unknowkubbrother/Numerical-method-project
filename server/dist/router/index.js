"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const problem_1 = __importDefault(require("./problem"));
const rootMethods_1 = __importDefault(require("./rootMethods"));
const HWRootMethods_1 = __importDefault(require("./HWRootMethods"));
const linearMethods_1 = __importDefault(require("./linearMethods"));
const interpolationMethods_1 = __importDefault(require("./interpolationMethods"));
const regression_1 = __importDefault(require("./regression"));
const router = express_1.default.Router();
exports.default = () => {
    (0, problem_1.default)(router);
    (0, rootMethods_1.default)(router);
    (0, HWRootMethods_1.default)(router);
    (0, linearMethods_1.default)(router);
    (0, interpolationMethods_1.default)(router);
    (0, regression_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map