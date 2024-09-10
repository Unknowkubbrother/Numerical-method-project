import express from 'express';
import {cramer, gaussElimination, gaussJordan,matrixInversion,ludecomposition, choleskydecomposition, jacobi, guassseidel, conjugate} from '../controllers/LinearAlgebraicEquation';
export default (router: express.Router) => {
    router.post('/linear/cramer', cramer)
    router.post('/linear/gaussElimination', gaussElimination)
    router.post('/linear/gaussJordan', gaussJordan)
    router.post('/linear/matrixInversion', matrixInversion)
    router.post('/linear/ludecomposition', ludecomposition)
    router.post('/linear/choleskydecomposition', choleskydecomposition)
    router.post('/linear/jacobi', jacobi)
    router.post('/linear/guassseidel', guassseidel)
    router.post('/linear/conjugate', conjugate)
}