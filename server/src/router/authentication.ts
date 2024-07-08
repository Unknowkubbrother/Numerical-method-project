import express from 'express';
import {register,google} from '../controllers/authentication';

export default (router: express.Router) => {
    router.post('/auth/register', register)
    router.get('/auth/google',google)
}