import express from 'express';

import problem from './problem';
import rootMethods from './rootMethods';
import HWRootMethods from './HWRootMethods';
import linearMethods from './linearMethods';
import interpolationMethods from './interpolationMethods';
import Regression from './regression';
import integration from './integration';
import Differentiation from './Differentiation';
import swagger from './swagger';

const router = express.Router();

export default () => {
    problem(router)
    rootMethods(router)
    HWRootMethods(router)
    linearMethods(router)
    interpolationMethods(router)
    Regression(router)
    integration(router)
    Differentiation(router)
    swagger(router)
    return router;
}