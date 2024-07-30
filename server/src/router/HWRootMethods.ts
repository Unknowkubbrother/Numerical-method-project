import express from 'express';
import { HW1 , HW2, HW3 , HW5, HW6, HwOnePoint, Hw3Newton,HW3Secant} from '../controllers/HWRootMethods';

export default (router: express.Router) => {
    router.post('/numerical/HW1', HW1)
    router.post('/numerical/HW2', HW2)
    router.post('/numerical/HW3', HW3)
    router.post('/numerical/HW5', HW5)
    router.post('/numerical/HW6', HW6)
    router.post('/numerical/onepoint', HwOnePoint)
    router.post('/numerical/HW3NEWTON', Hw3Newton)
    router.post('/numerical/HW3Secant', HW3Secant)
}