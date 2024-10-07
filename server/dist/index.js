"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(process.env.MONGO_URL);
mongoose_1.default.connection.on('error', (error) => console.log(error));
app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Sever running on port: ${process.env.SERVER_PORT || 3000}`);
});
const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "REST API for Swagger Documentation",
            version: "1.0.0",
        },
        schemes: ["http", "https"],
        servers: [{ url: "http://localhost:3000/auth/register" }],
    },
    apis: [
        `./dist/controllers/*.js`,
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/', (0, router_1.default)());
//# sourceMappingURL=index.js.map