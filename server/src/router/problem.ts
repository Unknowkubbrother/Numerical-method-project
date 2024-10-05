import express from 'express';
import {problemCreate, problemGet} from '../controllers/problem';

export default (router: express.Router) => {
    // router.post('/auth/register', register)
    router.post('/problem/create', problemCreate)
    router.post('/problem/get', problemGet)
}