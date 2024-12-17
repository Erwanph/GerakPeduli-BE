import { Request, Response } from 'express';
import Progress from '../models/progress';


export const markAsRead = async (req: Request, res: Response) => {
  const { userId, materialId } = req.body;

  try {

    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = new Progress({ userId, materials: [] });
    }

    const materialIndex = progress.materials.findIndex((m) => m.materialId === materialId);
    if (materialIndex > -1) {
      progress.materials[materialIndex].isMarkedAsRead = true;
    } else {
      progress.materials.push({ materialId, isMarkedAsRead: true });
    }

    await progress.save();

    res.status(200).json({ message: 'Material marked as read', progress });
  } catch (error) {
    res.status(500).json({ message: 'Error marking material as read', error });
  }
};


export const getProgress = async (req: Request, res: Response) : Promise<any> => {
  const { userId } = req.params;

  try {
    const progress = await Progress.findOne({ userId });
    if (!progress) return res.status(404).json({ message: 'Progress not found' });

    const totalMaterials = progress.materials.length;
    const markedAsReadCount = progress.materials.filter((m) => m.isMarkedAsRead).length;
    const progressPercentage = totalMaterials ? (markedAsReadCount / totalMaterials) * 100 : 0;

    res.status(200).json({ progressPercentage });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error });
  }
};
