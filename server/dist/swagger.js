"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const outputFile = './swagger.json';
const endpointsFiles = [
    '../src/router/problem.ts',
    // '../src/router/rootMethods.ts',
    // '../src/router/HWRootMethods.ts',
    // '../src/router/linearMethods.ts',
    // '../src/router/interpolationMethods.ts',
    // '../src/router/Regression.ts',
    // '../src/router/integration.ts',
    // '../src/router/Differentiation.ts',
];
// Generate Swagger documentation
const doc = {
    info: {
        title: 'Numer API',
        description: 'Numer API',
    },
    host: 'numer-api.unknowkubbrother.net',
    schemes: ['https'],
};
(0, swagger_autogen_1.default)(outputFile, endpointsFiles, doc);
//# sourceMappingURL=swagger.js.map