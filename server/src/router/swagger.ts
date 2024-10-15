import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

const options = {
    explorer: false,
};

export default (router: express.Router) => {
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
}
