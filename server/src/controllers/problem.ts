import express from 'express';
import { createProblem , ProblemType, SolutionType , getProblem } from '../models/problem';
// import axios from 'axios';

interface Problem {
    type: ProblemType;
    solution: SolutionType;
    input: object;
    output?: object;
}

export const problemCreate = async (req: express.Request, res: express.Response) => {
    try{

        const { problem } : {problem : Problem} = req.body;
        
         if(!problem){
            return res.sendStatus(400);
         }

        const response  = await createProblem({ problem });
        
        return res.status(201).json(response).end();


        // {
        //     "problem":{
        //         "type": "Root of Equation",
        //         "solution": "graphical",
        //         "input" : {
        //             "equation" : "x^2-7",
        //             "xStart" : 1,
        //             "xEnd" : 10
        //         }
        //     }
        // }

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const problemGet = async (req: express.Request, res: express.Response) => {
    try{
        const {input , type , solution} = req.body;

        const response = await getProblem(input , type , solution);

        if (response){
            return res.status(200).json(response).end();
        }

        return res.sendStatus(404);
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}