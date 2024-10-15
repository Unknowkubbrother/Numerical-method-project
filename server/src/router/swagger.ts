import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

var options = {
    explorer: false,
    
};

export default (router: express.Router) => {
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
}
