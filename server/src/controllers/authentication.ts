import express from 'express';
import { createUser } from '../models/users';
import axios from 'axios';

export const register = async (req: express.Request, res: express.Response) => {
    try{

        const {username,password} = req.body;
        
         if(!username || !password){
            return res.sendStatus(400);
         }

        const user  = await createUser({
            username,
            password
        });
        
        return res.status(201).json(user).end();


    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const google = async (req: express.Request, res: express.Response) => {
    try{

        res.send('Hello Google')

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

