import express from 'express';
import { SingTrapezoidal, CompositeTrapezoidal, Simpson, CompositeSimpson} from '../controllers/integration';
export default (router: express.Router) => {
    router.post('/interpolation/singtrapezoidal', SingTrapezoidal)
    router.post('/interpolation/compositetrapezoidal', CompositeTrapezoidal)
    router.post('/interpolation/simpson', Simpson)
    router.post('/interpolation/compositesimpson', CompositeSimpson)

}