import { DexieLogsRepository } from './dexie/dexieLogsRepository'
import { DexiePlansRepository } from './dexie/dexiePlansRepository'
import { dexieTrainingRepository } from './dexie/dexieTrainingRepository'
import type { LogsRepository } from './interfaces/logsRepository'
import type { PlansRepository } from './interfaces/plansRepository'
import type { TrainingRepository } from './interfaces/trainingRepository'

export const trainingRepository: TrainingRepository = dexieTrainingRepository
export const logsRepository: LogsRepository = DexieLogsRepository
export const plansRepository: PlansRepository = DexiePlansRepository
