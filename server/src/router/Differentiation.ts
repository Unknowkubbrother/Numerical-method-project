import express from 'express';
import {Differentiation} from '../controllers/Differentiation';
export default (router: express.Router) => {
    router.post('/differentiation', Differentiation)

}