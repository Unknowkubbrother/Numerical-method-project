import express from 'express';
import { Trapezoidal, CompositeTrapezoidal, Simpson, CompositeSimpson} from '../controllers/integration';
export default (router: express.Router) => {
    router.post('/interpolation/singtrapezoidal', Trapezoidal)
    router.post('/interpolation/compositetrapezoidal', CompositeTrapezoidal)
    router.post('/interpolation/simpson', Simpson)
    router.post('/interpolation/compositesimpson', CompositeSimpson)

}