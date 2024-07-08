import express from 'express';
import {graphical} from '../controllers/RootOfEquation';

export default (router: express.Router) => {
    router.post('/numerical/root/graphical',graphical)
}