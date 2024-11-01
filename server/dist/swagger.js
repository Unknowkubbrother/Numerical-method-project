"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const outputFile = './swagger.json';
const endpointsFiles = [
    '../src/router/problem.ts'
];
const doc = {
    info: {
        title: 'Numer API',
        description: 'Numer API',
    },
    host: process.env.DOMAIN || 'numer-api.unknowkubbrother.net',
    schemes: process.env.DOMAIN ? ['http'] : ['https'],
};
(0, swagger_autogen_1.default)(outputFile, endpointsFiles, doc);
//# sourceMappingURL=swagger.js.map