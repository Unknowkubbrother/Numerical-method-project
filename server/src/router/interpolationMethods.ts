import express from 'express';
import { newton, legrange } from '../controllers/Interpolation';
export default (router: express.Router) => {
    router.post('/interpolation/newton', newton)
    router.post('/interpolation/legrange', legrange)

}