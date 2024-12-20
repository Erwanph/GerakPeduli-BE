import express from 'express';

import authentication from './authentication';
import users from './users';
import disaster from './disaster';
const router = express.Router();
export default (): express.Router => {
    authentication(router);
    users(router);
    disaster(router);
    return router;
};