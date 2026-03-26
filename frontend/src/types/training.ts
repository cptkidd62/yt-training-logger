export class Training {
  id: string;
  title: string;
  length: number;
  channel: string;
  date_created: number;

  constructor(id: string) {
    this.id = id;
    this.title = 'Sample training';
    this.length = 30;
    this.channel = 'Sample channel';
    this.date_created = 0;
  }
}