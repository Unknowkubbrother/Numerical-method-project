import express from 'express';
import {graphical,bisection, falsePosition, onePoint,newTon,secant} from '../controllers/RootOfEquation';

export default (router: express.Router) => {
    router.post('/root/graphical',graphical)
    router.post('/root/bisection',bisection)
    router.post('/root/falsePosition',falsePosition)
    router.post('/root/onePoint',onePoint)
    router.post('/root/newTon',newTon)
    router.post('/root/seant',secant)
}