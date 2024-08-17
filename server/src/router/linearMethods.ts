import express from 'express';
import {cramer, gaussElimination, gaussJordan,matrixInversion,ludecomposition} from '../controllers/LinearAlgebraicEquation';
export default (router: express.Router) => {
    router.post('/linear/cramer', cramer)
    router.post('/linear/gaussElimination', gaussElimination)
    router.post('/linear/gaussJordan', gaussJordan)
    router.post('/linear/matrixInversion', matrixInversion)
    router.post('/linear/ludecomposition', ludecomposition)

}