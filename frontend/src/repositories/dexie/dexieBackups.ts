import { db } from './db'

export async function dexieExportToJSON() {
  const date = new Date().toISOString()

  const data = {
    trainings: await db.trainings.toArray(),
    logs: await db.logs.toArray(),
    exportedAt: date,
    version: 1,
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })

  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `yttl-backup-${date}.json`
  a.click()
}
