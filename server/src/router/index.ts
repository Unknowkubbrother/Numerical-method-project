import express from 'express';

import authentication from './authentication';
import rootMethods from './rootMethods';
import HWRootMethods from './HWRootMethods';
import linearMethods from './linearMethods';
import interpolationMethods from './interpolationMethods';

const router = express.Router();

export default (): express.Router => {
    authentication(router)
    rootMethods(router)
    HWRootMethods(router)
    linearMethods(router)
    interpolationMethods(router)
    return router;
}