import { DisplayableLog, type TrainingLog } from '@/types/traininglog'
import type { LogsRepository } from '../interfaces/logsRepository'
import { db } from './db'
import type { Training } from '@/types/training'

export const DexieLogsRepository: LogsRepository = {
  getAll: async function (): Promise<DisplayableLog[]> {
    const logs = await db.logs.toArray()
    const ids = logs.map((log) => log.trainingID)
    const trainings = await db.trainings.bulkGet(ids)
    const trainingMap = new Map(
      trainings.filter((t): t is Training => t !== undefined).map((t) => [t.id, t]),
    )
    return logs.map((training) => {
      const tr = trainingMap.get(training.trainingID)
      return DisplayableLog.fromTrainingLog(
        training,
        tr?.title ?? 'Deleted training with ID ' + training.trainingID,
      )
    })
  },
  getByID: async function (id: number): Promise<DisplayableLog | undefined> {
    const log = await db.logs.get(id)
    if (log === undefined) {
      return log
    }
    const training = await db.trainings.get(log.trainingID)
    return DisplayableLog.fromTrainingLog(
      log,
      training?.title ?? 'Deleted training with ID ' + log.trainingID,
    )
  },
  add: function (log: TrainingLog): Promise<number | undefined> {
    return db.logs.add(log)
  },
  remove: function (id: number): Promise<void> {
    return db.logs.delete(id)
  },
}
