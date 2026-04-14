import type { Training } from '@/types/training'
import { db } from './db'
import type { TrainingLog } from '@/types/traininglog'
import type { TrainingPlan } from '@/types/trainingplan'

export type BackupJSON_v1 = {
  trainings: Training[]
  logs: TrainingLog[]
  exportedAt: string
  version: 1
}

export type BackupJSON_v2 = {
  trainings: Training[]
  logs: TrainingLog[]
  plans: TrainingPlan[]
  exportedAt: string
  version: 2
}

export async function dexieExportToJSON() {
  const date = new Date().toISOString()

  const data: BackupJSON_v2 = {
    trainings: await db.trainings.toArray(),
    logs: await db.logs.toArray(),
    plans: await db.plans.toArray(),
    exportedAt: date,
    version: 2,
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })

  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `yttl-backup-${date}.json`
  a.click()
}

export async function dexieImportFromJSON(data: BackupJSON_v1 | BackupJSON_v2) {
  if (data.version == 1) {
    await db.transaction('rw', db.trainings, db.logs, async () => {
      await db.trainings.clear()
      await db.logs.clear()
      await db.trainings.bulkAdd(data.trainings)
      await db.logs.bulkAdd(data.logs)
    })
  } else if (data.version == 2) {
    await db.transaction('rw', db.trainings, db.logs, async () => {
      await db.trainings.clear()
      await db.logs.clear()
      await db.plans.clear()
      await db.trainings.bulkAdd(data.trainings)
      await db.logs.bulkAdd(data.logs)
      await db.plans.bulkAdd(data.plans)
    })
  }
}

export async function dexieParseBackupFile(
  file: File,
): Promise<BackupJSON_v1 | BackupJSON_v2 | undefined> {
  const text = await file.text()
  const data = JSON.parse(text)
  if (
    data.version === 1 &&
    new Date(data.exportedAt) < new Date() &&
    Array.isArray(data.trainings) &&
    Array.isArray(data.logs)
  ) {
    return {
      trainings: data.trainings,
      logs: data.logs,
      exportedAt: data.exportedAt,
      version: 1,
    }
  } else if (
    data.version === 2 &&
    new Date(data.exportedAt) < new Date() &&
    Array.isArray(data.trainings) &&
    Array.isArray(data.logs) &&
    Array.isArray(data.plans)
  ) {
    return {
      trainings: data.trainings,
      logs: data.logs,
      plans: data.plans,
      exportedAt: data.exportedAt,
      version: 2,
    }
  } else {
    return undefined
  }
}
