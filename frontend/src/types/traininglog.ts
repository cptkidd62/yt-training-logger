export class TrainingLog {
  id?: number
  trainingID: string
  date: number
  createdAt: number

  constructor(training: string, date: number, createdAt: number) {
    this.trainingID = training
    this.date = date
    this.createdAt = createdAt
  }
}
