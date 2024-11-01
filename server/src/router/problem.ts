import express from 'express';
import {problemCreate,problemGetByType, problemsGetbyId} from '../controllers/problem';

export default (router: express.Router) => {
    router.post('/problem/create', problemCreate)
    router.post('/problem/getByType', problemGetByType)
    router.post('/problem/:id', problemsGetbyId);
}