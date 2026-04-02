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

export class DisplayableLog {
  id: number
  trainingID: string
  trainingTitle: string
  date: number
  createdAt: number

  constructor(
    id: number,
    training: string,
    trainingTitle: string,
    date: number,
    createdAt: number,
  ) {
    this.id = id
    this.trainingID = training
    this.trainingTitle = trainingTitle
    this.date = date
    this.createdAt = createdAt
  }

  static fromTrainingLog(training: TrainingLog, trainingTitle: string): DisplayableLog {
    return {
      id: training.id!,
      trainingID: training.trainingID,
      trainingTitle: trainingTitle,
      date: training.date,
      createdAt: training.createdAt,
    }
  }
}
