
require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';
import swaggerUIPath from 'swagger-ui-express';
const swaggerDocument = require('./swagger.json');
const app : express.Express = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/api-docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerDocument));

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Sever running on port: ${process.env.SERVER_PORT || 3000}`);
});

app.use('/', router())