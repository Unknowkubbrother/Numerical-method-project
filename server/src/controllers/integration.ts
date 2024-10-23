import express from 'express';

import { TrapezoidalRequest, TrapezoidalMethods, TrapezoidalResponse} from '../functions/integration/Trapezoidal';
import { CompositeTrapezoidalMethods, CompositeTrapezoidalRequest, CompositeTrapezoidalResponse } from '../functions/integration/CompositeTrapezoidal';
import { SimpsonMethods,SimpsonRequest,SimpsonResponse } from '../functions/integration/Simpson';
import { CompositeSimpsonMethods, CompositeSimpsonRequest, CompositeSimpsonResponse} from '../functions/integration/CompositeSimpson';

export const Trapezoidal = async (req: express.Request, res: express.Response) => {
    try{

        const {a, b , equation} : TrapezoidalRequest = req.body;

        let result : TrapezoidalResponse = TrapezoidalMethods(a, b , equation);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const CompositeTrapezoidal = async (req: express.Request, res: express.Response) => {
    try{

        const {xStart, xEnd , n, equation} : CompositeTrapezoidalRequest = req.body;

        let result : CompositeTrapezoidalResponse = CompositeTrapezoidalMethods(xStart, xEnd , n, equation);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const Simpson = async (req: express.Request, res: express.Response) => {
    try{

        const {xStart, xEnd , equation} : SimpsonRequest = req.body;

        let result : SimpsonResponse = SimpsonMethods(xStart, xEnd , equation);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const CompositeSimpson = async (req: express.Request, res: express.Response) => {
    try{

        const {xStart, xEnd , n, equation} : CompositeSimpsonRequest = req.body;

        let result : CompositeSimpsonResponse = CompositeSimpsonMethods(xStart, xEnd , n, equation);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}