import express from 'express';
import { createProblem , getProblem, getProblemsByType,getProblems,getProblemById } from '../models/problem';

export const problemCreate = async (req: express.Request, res: express.Response) => {
    try{

        const { type, solution, input , output} = req.body;
        
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

export const problemGetByType = async (req: express.Request, res: express.Response) => {
    try{
        const {type} = req.body;

        const response = await getProblemsByType(type).select('type solution input output.result createdAt');

        if (response){
            return res.status(200).json(response).end();
        }

        return res.sendStatus(404);
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}

export const problemsGetbyId = async(req : express.Request , res : express.Response) =>{
    try{
        const { id } = req.params;
        const response = await getProblemById(id);

        if (!response) {
            return res.sendStatus(404);
        }
        
        return res.status(200).json(response).end();


    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }

}