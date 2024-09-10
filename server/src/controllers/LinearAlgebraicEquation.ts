import express from 'express';
import { CramerRequest, CramerResponse, CramerMethod} from '../functions/linearMethods/cramer';
import { GaussEliminationRequest, GaussEliminationResponse, GaussEliminationMethod} from '../functions/linearMethods/gaussElimination';
import { GaussJordanRequest, GaussJordanResponse, GaussJordanMethod} from '../functions/linearMethods/gaussJordan';
import { MatrixInversionMethod, MatrixInversionRequest, MatrixInversionResponse } from '../functions/linearMethods/matrixInversion';
import {LudecompositionRequest, LudecompositionResponse, LudecompositionMethod} from '../functions/linearMethods/Ludecomposition';
import {CholeskydecompositionRequest, CholeskydecompositionResponse, CholeskydecompositionMethod} from '../functions/linearMethods/Choleskydecomposition';
import {JacobiRequest, JacobiResponse, JacobiMethod} from '../functions/linearMethods/Jacobi';
import {GaussSeiDelMethod,GaussSeiDelRequest,GaussSeiDelResponse} from '../functions/linearMethods/guassseidel';
import {ConjugateMethods,ConjugateRequest,ConjugateResponse} from '../functions/linearMethods/conjugate';

export const cramer = async (req: express.Request, res: express.Response) => {
    try{
        // {
        //     "matrixA": [[2,1],[1,-1]],
        //     "arrB": [4,-1]
        // }
        // {
        //     "matrixA": [[4,-4,0],[-1,4,-2],[0,-2,4]],
        //     "arrB": [400,400,400]
        // }
        const {matrixA, arrB} : CramerRequest = req.body;

        const result : CramerResponse = CramerMethod(matrixA, arrB);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const gaussElimination = async (req: express.Request, res: express.Response) => {
    try{

        const {matrixA, arrB} : GaussEliminationRequest = req.body;

        const result : GaussEliminationResponse = GaussEliminationMethod(matrixA, arrB);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const gaussJordan = async (req: express.Request, res: express.Response) => {
    try{

        const {matrixA, arrB} : GaussJordanRequest = req.body;

        let result : GaussJordanResponse = GaussJordanMethod(matrixA, arrB);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const matrixInversion = async (req: express.Request, res: express.Response) => {
    try{

        const {matrixA, arrB} : MatrixInversionRequest = req.body;

        let result : MatrixInversionResponse = MatrixInversionMethod(matrixA, arrB);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const ludecomposition = async (req: express.Request, res: express.Response) => {
    try{

        const {matrixA, arrB} : LudecompositionRequest = req.body;

        let result : LudecompositionResponse = LudecompositionMethod(matrixA, arrB);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const choleskydecomposition = async (req: express.Request, res: express.Response) => {
    try{

        const {matrixA, arrB} : CholeskydecompositionRequest = req.body;

        let result : CholeskydecompositionResponse = CholeskydecompositionMethod(matrixA, arrB);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const jacobi = async (req: express.Request, res: express.Response) => {
    try{

        const {matrixA, arrB, initialX, errorFactor} : JacobiRequest = req.body;

        let result : JacobiResponse = JacobiMethod(matrixA, arrB, initialX, errorFactor);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const guassseidel = async (req: express.Request, res: express.Response) => {
    try{

        const {matrixA, arrB, initialX, errorFactor} : GaussSeiDelRequest = req.body;

        let result : GaussSeiDelResponse = GaussSeiDelMethod(matrixA, arrB, initialX, errorFactor);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}



export const conjugate = async (req: express.Request, res: express.Response) => {
    try{

        const {matrixA, arrB, initialX, errorFactor} : ConjugateRequest = req.body;

        let result : ConjugateResponse = ConjugateMethods(matrixA, arrB, initialX, errorFactor);

        return res.status(result.statusCode).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}