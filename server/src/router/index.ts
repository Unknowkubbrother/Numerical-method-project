import express from 'express';

import authentication from './authentication';
import rootMethods from './rootMethods';
import HWRootMethods from './HWRootMethods';

const router = express.Router();

export default (): express.Router => {
    authentication(router)
    rootMethods(router)
    HWRootMethods(router);
    return router;
}