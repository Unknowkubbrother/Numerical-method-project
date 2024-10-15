import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = [
    '../src/router/problem.ts',
    '../src/router/rootMethods.ts',
    '../src/router/HWRootMethods.ts',
    '../src/router/linearMethods.ts',
    '../src/router/interpolationMethods.ts',
    '../src/router/Regression.ts',
    '../src/router/integration.ts',
    '../src/router/Differentiation.ts',
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

swaggerAutogen(outputFile, endpointsFiles, doc);