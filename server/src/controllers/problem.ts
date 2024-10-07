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

        const { type, solution, input , output} : Problem= req.body;
        
         if(!type || !solution || !input){
            return res.sendStatus(400);
         }

         const checkExist = await getProblem(input , type , solution);

         if (checkExist){
            return res.sendStatus(409);
         }

        const response  = await createProblem({
            type,
            solution,
            input,
            output
         });
        
        return res.status(201).json(response).end();

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