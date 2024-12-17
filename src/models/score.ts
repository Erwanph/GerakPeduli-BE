import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const ScoreModel = mongoose.model('Score', ScoreSchema);

export const getScoresByUserId = (userId: string) => ScoreModel.find({ user: userId });
export const getLatestScoreByUserId = (userId: string) => 
    ScoreModel.findOne({ user: userId }).sort({ timestamp: -1 });
export const createScore = (values: Record<string, any>) => 
    new ScoreModel(values).save().then((score) => score.toObject());

