import express from 'express';
import { CramerRequest, CramerResponse, CramerMethod} from '../functions/linearMethods/cramer';
import { GaussEliminationRequest, GaussEliminationResponse, GaussEliminationMethod} from '../functions/linearMethods/gaussElimination';

export const cramer = async (req: express.Request, res: express.Response) => {
    try{
        // {
        //     "martixA": [[2,1],[1,-1]],
        //     "arrB": [4,-1]
        // }
        // {
        //     "martixA": [[4,-4,0],[-1,4,-2],[0,-2,4]],
        //     "arrB": [400,400,400]
        // }
        const {martixA, arrB} : CramerRequest = req.body;

        const result : CramerResponse = CramerMethod(martixA, arrB);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const gaussElimination = async (req: express.Request, res: express.Response) => {
    try{

        const {martixA, arrB} : GaussEliminationRequest = req.body;

        const result : GaussEliminationResponse = GaussEliminationMethod(martixA, arrB);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}