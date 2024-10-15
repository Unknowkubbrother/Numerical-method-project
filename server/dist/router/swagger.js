"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
var options = {
    explorer: false
};
exports.default = (router) => {
    router.use('/api-docs', swagger_ui_express_1.default.serve);
    router.get('/api-docs', swagger_ui_express_1.default.setup(swagger_json_1.default, options));
};
//# sourceMappingURL=swagger.js.map