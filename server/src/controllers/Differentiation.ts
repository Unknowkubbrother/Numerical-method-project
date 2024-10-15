import express from 'express';
import { DifferentiationMethods,DifferentiationRequest,DifferentiationResponse } from '../functions/Differentiation/Differentiation';


export const Differentiation = async (req: express.Request, res: express.Response) => {
    try{

        const {x, h , equation, type, oh} : DifferentiationRequest = req.body;

        let result : DifferentiationResponse = DifferentiationMethods(x, h , equation, type, oh);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}