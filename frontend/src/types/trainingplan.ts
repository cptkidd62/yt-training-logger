// week type represents array of days each storing an array of training ids
// week starts from sunday as 0 as in Date type specification, 7 respresents 'other'

import type { Training } from './training'

export type TrainingPlan = {
  id: number
  title: string
  description: string
  weeks: string[][][]
}

export type TrainingPlanView = {
  id: number
  title: string
  description: string
  weeks: Training[][][]
}
