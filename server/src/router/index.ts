import express from 'express';

import problem from './problem';
import rootMethods from './rootMethods';
import HWRootMethods from './HWRootMethods';
import linearMethods from './linearMethods';
import interpolationMethods from './interpolationMethods';
import Regression from './regression';

const router = express.Router();

export default (): express.Router => {
    problem(router)
    rootMethods(router)
    HWRootMethods(router)
    linearMethods(router)
    interpolationMethods(router)
    Regression(router)
    return router;
}