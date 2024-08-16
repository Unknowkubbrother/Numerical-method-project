import express from 'express';
import { GraphicalRequest, graphicalMethod, GraphicalResponse } from '../functions/rootMethods/graphical';
import { BisectionRequest, bisectionMethod, BisectionResponse } from '../functions/rootMethods/bisection';
import { FalsePositionRequest, FalsePositionResponse, falsePositionMethod } from '../functions/rootMethods/falsePosition';
import { OnePointRequest, OnePointResponse, OnepointMethod } from '../functions/rootMethods/onepoint';
import { NewTonRequest, NewTonResponse, NewTonMethod } from '../functions/rootMethods/newton';
import { SecantRequest, SecantResponse, SecantMethod } from '../functions/rootMethods/secant';

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

export const bisection = async (req: express.Request, res: express.Response) => {
    try{        
        const {xStart, xEnd, func, errorFactor} : BisectionRequest = req.body;

        const result : BisectionResponse = bisectionMethod(xStart, xEnd, func, errorFactor);

        return res.status(result.statusCode).json(result).end();

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const falsePosition = async (req: express.Request, res: express.Response) => {
    try{
        const {xStart, xEnd, func, errorFactor} : FalsePositionRequest = req.body;

        const result : FalsePositionResponse = falsePositionMethod(xStart, xEnd, func, errorFactor);

        return res.status(result.statusCode).json(result).end();
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const onePoint = async (req: express.Request, res: express.Response) => {
    try{
        const {xInitial, func, errorFactor} : OnePointRequest = req.body;

        const result : OnePointResponse = OnepointMethod(xInitial, func, errorFactor);

        return res.status(result.statusCode).json(result).end();

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const newTon = async (req: express.Request, res: express.Response) => {
    try{
        const {xInitial, func, errorFactor} : NewTonRequest = req.body;

        const result : NewTonResponse = NewTonMethod(xInitial, func, errorFactor);

        return res.status(result.statusCode).json(result).end();

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const secant = async (req: express.Request, res: express.Response) => {
    try{
        const {xInitial0, xInitial1, func, errorFactor} : SecantRequest = req.body;

        const result : SecantResponse = SecantMethod(xInitial0, xInitial1, func, errorFactor);

        return res.status(result.statusCode).json(result).end();

    }catch (error) {
        console.log(error);
        return res.sendStatus
    }
}