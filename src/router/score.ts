import express from 'express';
import { saveScore, getLatestScore } from '../controllers/score';

export default (router: express.Router) => {
    router.post('/save', saveScore);
    router.get('/latest', getLatestScore);
};
