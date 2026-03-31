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
}
