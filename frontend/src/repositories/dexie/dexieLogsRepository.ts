import type { TrainingLog } from '@/types/traininglog'
import type { LogsRepository } from '../interfaces/logsRepository'
import { db } from './db'

export const DexieLogsRepository: LogsRepository = {
  getAll: function (): Promise<TrainingLog[]> {
    return db.logs.toArray()
  },
  getByID: function (id: number): Promise<TrainingLog | undefined> {
    return db.logs.get(id)
  },
  add: function (log: TrainingLog): Promise<number | undefined> {
    return db.logs.add(log)
  },
  remove: function (id: number): Promise<void> {
    return db.logs.delete(id)
  },
}
