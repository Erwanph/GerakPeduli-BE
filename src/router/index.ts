import express from 'express';

import authentication from './authentication';
import users from './users';
import progress from './progress';
import score from './score';
const router = express.Router();
export default (): express.Router => {
    authentication(router);
    users(router);
    progress(router);
    score(router);
    return router;
};