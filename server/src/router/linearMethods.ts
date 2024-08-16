import express from 'express';
import {cramer, gaussElimination} from '../controllers/LinearAlgebraicEquation';
export default (router: express.Router) => {
    router.post('/linear/cramer', cramer)
    router.post('/linear/gaussElimination', gaussElimination)

}