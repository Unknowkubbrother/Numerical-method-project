import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

var options = {
    explorer: false,
};

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

export default (router: express.Router) => {
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        customCss:
            '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: start; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
        customCssUrl: CSS_URL,
    }
    ));
}
