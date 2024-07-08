import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import fs from 'fs';
import YAML from 'yaml';
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);


export const swagger = (app : any) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}