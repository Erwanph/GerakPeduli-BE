import mongoose, { Schema, Document } from 'mongoose';

interface IProgress extends Document {
  userId: string;
  materials: {
    materialId: string;
    isMarkedAsRead: boolean;
  }[];
}

const ProgressSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  materials: [
    {
      materialId: { type: String, required: true },
      isMarkedAsRead: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model<IProgress>('Progress', ProgressSchema);
