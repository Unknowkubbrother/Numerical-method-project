import express from 'express';
import {graphical,bisection, falsePosition} from '../controllers/RootOfEquation';

export default (router: express.Router) => {
    router.post('/numerical/root/graphical',graphical)
    router.post('/numerical/root/bisection',bisection)
    router.post('/numerical/root/falsePosition',falsePosition)
}