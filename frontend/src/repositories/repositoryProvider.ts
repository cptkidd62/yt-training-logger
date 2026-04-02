import { DexieLogsRepository } from './dexie/dexieLogsRepository'
import { dexieTrainingRepository } from './dexie/dexieTrainingRepository'
import type { LogsRepository } from './interfaces/logsRepository'
import type { TrainingRepository } from './interfaces/trainingRepository'

export const trainingRepository: TrainingRepository = dexieTrainingRepository
export const logsRepository: LogsRepository = DexieLogsRepository
