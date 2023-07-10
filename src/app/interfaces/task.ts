export interface Task {
  id: number | null;
  priority: Priority;
  name: string;
  spendTime: number;
  totalTime: number;
  done: boolean;
}
export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3
}
