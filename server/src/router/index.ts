import express from 'express';
import problem from './problem';
import swagger from './swagger';

const router = express.Router();

export default () => {
    problem(router)
    swagger(router)
    return router;
}