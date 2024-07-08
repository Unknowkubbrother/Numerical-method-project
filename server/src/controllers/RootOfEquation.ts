import express from 'express';
import math from '../lib/math';
import { GraphicalRequest, graphicalMethod, GraphicalResponse } from '../functions/rootMethods/graphical';

export const graphical = async (req: express.Request, res: express.Response) => {
    try{

        // {
        //     "xStart" : 0,
        //     "xEnd":  9,
        //     "func": "(e^(-x/4.00))(2-x)-1",
        //     "errorFactor": 0.001
        // }
        
        const {xStart, xEnd, func, errorFactor} : GraphicalRequest = req.body;

        const result : GraphicalResponse = graphicalMethod(xStart, xEnd, func, errorFactor);


        return res.status(result.statusCode).json(result).end();


    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}