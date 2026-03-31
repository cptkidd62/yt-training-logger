import type { Training } from '@/types/training'
import type { TrainingRepository } from '../interfaces/trainingRepository'
import { db } from './db'

export const dexieTrainingRepository: TrainingRepository = {
  getAll(): Promise<Training[]> {
    return db.trainings.toArray()
  },
  getByID(id: string): Promise<Training | undefined> {
    return db.trainings.get(id)
  },
  add(training: Training): Promise<string> {
    return db.trainings.add(training, training.id)
  },
  remove(id: string): Promise<void> {
    return db.trainings.delete(id)
  },
}
