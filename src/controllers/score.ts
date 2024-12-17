import { Request, Response } from 'express';
import { getLatestScoreByUserId, createScore } from '../models/score';
import { getUserBySessionToken } from "../db/users";
import { get } from 'lodash';

export const saveScore = async (req: Request, res: Response) : Promise<any> => {
    try {
        const sessionToken = req.cookies['CHEMICLY-AUTH'];
        const user = await getUserBySessionToken(sessionToken);
        
        if (!user) {
            return res.sendStatus(403);
        }

        const { score } = req.body;
        
        if (typeof score !== 'number') {
            return res.status(400).json({ error: 'Invalid score format' });
        }

        const newScore = await createScore({
            user: user._id,
            score: score
        });

        return res.json({ success: true, score: newScore });
    } catch (error) {
        console.error('Save score error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getLatestScore = async (req: Request, res: Response) : Promise<any> => {
    try {
        const sessionToken = req.cookies['CHEMICLY-AUTH'];
        const user = await getUserBySessionToken(sessionToken);
        
        if (!user) {
            return res.sendStatus(403);
        }

        const latestScore = await getLatestScoreByUserId(user._id.toString());
        return res.json({ score: latestScore?.score || 0 });
    } catch (error) {
        console.error('Get score error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const saveProgressGame = async (req: Request, res: Response) => {
    const { userId, score, currentQuestion, completedQuestions } = req.body;
  
    try {
      // Find the user and update their progress
      const user = await userId.findOneAndUpdate(
        { _id: userId },
        {
          score,
          currentQuestion,
          completedQuestions
        },
        { new: true, upsert: true }
      );
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error saving progress:', error);
      res.status(500).json({ error: 'Failed to save progress' });
    }
  };