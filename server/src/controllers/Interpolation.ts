import express from 'express';

import { NewtonDividedMethods, NewtonDividedRequest, NewtonDividedResponse } from '../functions/Interpolations/NewtonDivided';
import { LagrangeMethods,LagrangeRequest,LagrangeResponse } from '../functions/Interpolations/Lagrange';
import { SplineMethods, SplineRequest, SplineResponse } from '../functions/Interpolations/spline';


export const newton = async (req: express.Request, res: express.Response) => {
    try{

        const {x, points} : NewtonDividedRequest = req.body;

        let result : NewtonDividedResponse = NewtonDividedMethods(x, points);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const legrange = async (req: express.Request, res: express.Response) => {
    try{

        const {x, points} : LagrangeRequest = req.body;

        let result : LagrangeResponse = LagrangeMethods(x, points);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const spline = async (req: express.Request, res: express.Response) => {
    try{

        const {x, points, type} : SplineRequest = req.body;

        let result : SplineResponse = SplineMethods(x, points, type);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

