import type { TrainingLog } from '@/types/traininglog'

export interface LogsRepository {
  getAll(): Promise<TrainingLog[]>
  getByID(id: number): Promise<TrainingLog | undefined>
  add(log: TrainingLog): Promise<number | undefined>
  remove(id: number): Promise<void>
}
