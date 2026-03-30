import type { Training } from "@/types/training";

export interface TrainingRepository {
  getAll(): Promise<Training[]>;
  getByID(id: string): Promise<Training | undefined>;
  add(training: Training): Promise<string>;
  remove(id: string): Promise<void>;
}