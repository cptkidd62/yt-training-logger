// week type represents array of days each storing an array of training ids
// week starts from sunday as 0 as in Date type specification, 7 respresents 'other'

import type { Training } from './training'

export type TrainingPlan = {
  id?: number
  title: string
  description: string
  weeks: string[][][]
  createdAt: number
}

export type TrainingPlanView = {
  id: number
  title: string
  description: string
  weeks: Training[][][]
  createdAt: number
}

export function planViewToRaw(plan: TrainingPlanView): TrainingPlan {
  const weeks = plan.weeks.map((week) => week.map((day) => day.map((training) => training.id)))
  return {
    id: plan.id,
    title: plan.title,
    description: plan.description,
    weeks: weeks,
    createdAt: plan.createdAt,
  }
}
