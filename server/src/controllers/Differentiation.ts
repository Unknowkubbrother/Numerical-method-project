import express from 'express';
import { DifferentiationMethods,DifferentiationRequest,DifferentiationResponse } from '../functions/Differentiation/Differentiation';


export const Differentiation = async (req: express.Request, res: express.Response) => {
    try{

        let {x,h,equation,order,oh,direction} : DifferentiationRequest = req.body;

        let result : DifferentiationResponse = DifferentiationMethods(x,h,equation,order,oh,direction);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}