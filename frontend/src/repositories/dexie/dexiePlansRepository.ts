import type { TrainingPlanView, TrainingPlan } from '@/types/trainingplan'
import type { PlansRepository } from '../interfaces/plansRepository'
import { db } from './db'
import { Training } from '@/types/training'

export const DexiePlansRepository: PlansRepository = {
  getAll: async function (): Promise<TrainingPlanView[]> {
    const plans = await db.plans.toArray()
    const ids = plans.map((plan) => plan.weeks).flat(3)
    const trainings = await db.trainings.bulkGet(ids)
    const trainingMap = new Map(
      trainings.filter((t): t is Training => t !== undefined).map((t) => [t.id, t]),
    )
    return plans.map((plan) => {
      const trainings = plan.weeks.map((week) =>
        week.map((day) =>
          day.map((trainingID) => {
            return trainingMap.get(trainingID)!
          }),
        ),
      )
      return {
        id: plan.id!,
        title: plan.title,
        description: plan.description,
        createdAt: plan.createdAt,
        weeks: trainings,
      }
    })
  },
  getByID: async function (id: number): Promise<TrainingPlanView | undefined> {
    const plan = await db.plans.get(id)
    if (plan === undefined) {
      return plan
    }
    const ids = plan.weeks.flat(2)
    const tr = await db.trainings.bulkGet(ids)
    const trainingMap = new Map(
      tr.filter((t): t is Training => t !== undefined).map((t) => [t.id, t]),
    )
    const trainings = plan.weeks.map((week) =>
      week.map((day) =>
        day.map((trainingID) => {
          return trainingMap.get(trainingID)!
        }),
      ),
    )
    return {
      id: plan.id!,
      title: plan.title,
      description: plan.description,
      createdAt: plan.createdAt,
      weeks: trainings,
    }
  },
  add: async function (plan: TrainingPlan): Promise<number | undefined> {
    return db.plans.add(plan)
  },
  update: async function (id: number, plan: TrainingPlan): Promise<void> {
    db.plans.update(id, plan)
  },
  remove: async function (id: number): Promise<void> {
    return db.logs.delete(id)
  },
}
