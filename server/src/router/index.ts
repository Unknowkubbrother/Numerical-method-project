import express from 'express';

import authentication from './authentication';
import rootMethods from './rootMethods';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    rootMethods(router);
    return router;
}