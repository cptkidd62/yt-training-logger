import type { TrainingPlan, TrainingPlanView } from '@/types/trainingplan'

export interface PlansRepository {
  getAll(): Promise<TrainingPlanView[]>
  getByID(id: number): Promise<TrainingPlanView | undefined>
  add(plan: TrainingPlan): Promise<number | undefined>
  update(id: number, plan: TrainingPlan): Promise<void>
  remove(id: number): Promise<void>
}
