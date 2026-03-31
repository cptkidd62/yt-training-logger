import { dexieTrainingRepository } from './dexie/dexieTrainingRepository'
import type { TrainingRepository } from './interfaces/trainingRepository'

export const trainingRepository: TrainingRepository = dexieTrainingRepository
