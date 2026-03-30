import type { Training } from '@/types/training';
import { Dexie, type EntityTable } from 'dexie';

const db = new Dexie('yttl-test1') as Dexie & {
  trainings: EntityTable<Training, 'id'>;
};

db.version(1).stores({
  trainings: 'id, title, length, channel, date_created'
});

export { db };
