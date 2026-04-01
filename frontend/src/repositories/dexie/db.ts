import type { Training } from '@/types/training'
import type { TrainingLog } from '@/types/traininglog'
import { Dexie, type EntityTable } from 'dexie'

const db = new Dexie('yttl-test1') as Dexie & {
  trainings: EntityTable<Training, 'id'>
  logs: EntityTable<TrainingLog, 'id'>
}

db.version(1).stores({
  trainings: 'id, title, length, channel, date_created',
})

db.version(2).stores({
  trainings: 'id, title, length, channel, date_created',
  logs: '++id, trainingID, date, createdAt',
})

export { db }
