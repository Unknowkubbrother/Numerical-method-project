require('dotenv').config()
import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = [
    '../src/router/problem.ts'
];

const doc = {
    info: {
        title: 'Numer API',
        description: 'Numer API',
    },
    host: process.env.DOMAIN  || 'numer-api.unknowkubbrother.net',
    schemes: process.env.DOMAIN ? ['http'] : ['https'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);