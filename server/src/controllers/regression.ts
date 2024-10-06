import express from 'express';

import { simpleRegressionMethods , simpleRegressionRequest, simpleRegressionResponse } from '../functions/regressionMethods/simpleRegression';
import { multipleLinearRegressionMethods , multipleLinearRegressionRequest , multipleLinearRegressionResponse} from '../functions/regressionMethods/multiplelinearRegrssion';

export const simpleRegression = async (req: express.Request, res: express.Response) => {
    try{

        const {M, x, points} : simpleRegressionRequest = req.body;

        let result : simpleRegressionResponse = simpleRegressionMethods(M ,x, points);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const multipleLinearRegression = async (req: express.Request, res: express.Response) => {
    try{

        const {x, points} : multipleLinearRegressionRequest = req.body;

        let result : multipleLinearRegressionResponse = multipleLinearRegressionMethods( x , points);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

