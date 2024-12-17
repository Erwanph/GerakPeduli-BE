import express from 'express';
import { markAsRead, getProgress } from '../controllers/progress';

export default (router: express.Router) => {
    router.post('/mark-as-read', markAsRead);
    router.get('/:userId/progress', getProgress);
};
