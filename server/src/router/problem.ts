import express from 'express';
import {problemCreate, problemGetByITS,problemGetByType,problemGetAll, problemsGetbyId} from '../controllers/problem';

export default (router: express.Router) => {
    router.post('/problem/create', problemCreate)
    router.post('/problem/getByITS', problemGetByITS) // input type solution
    router.post('/problem/getByType', problemGetByType)
    router.get('/problem/getAll', problemGetAll)
    router.post('/problem/:id', problemsGetbyId);
}