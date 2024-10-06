import express from 'express';
import {simpleRegression, multipleLinearRegression} from '../controllers/regression';

export default (router: express.Router) => {
    router.post('/regression/simpleregression',simpleRegression)
    router.post('/regression/multiplelinearregression',multipleLinearRegression)
}