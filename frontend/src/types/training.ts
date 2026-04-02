export class Training {
  id: string
  title: string
  length: number
  channel: string
  date_created: number

  constructor(id: string, title: string, length: number, channel: string, date_created: number) {
    this.id = id
    this.title = title
    this.length = length
    this.channel = channel
    this.date_created = date_created
  }

  static fromRaw(training: Training): Training {
    return new Training(
      training.id,
      training.title,
      training.length,
      training.channel,
      training.date_created,
    )
  }

  getURL(): string {
    return 'https://www.youtube.com/watch?v=' + this.id
  }
}
