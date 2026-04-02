import type { DisplayableLog, TrainingLog } from '@/types/traininglog'

export interface LogsRepository {
  getAll(): Promise<DisplayableLog[]>
  getByID(id: number): Promise<DisplayableLog | undefined>
  add(log: TrainingLog): Promise<number | undefined>
  remove(id: number): Promise<void>
}
