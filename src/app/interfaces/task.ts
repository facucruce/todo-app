export interface Task {
    id: number | null;
    priority: Priority;
    name: string;
    remainingTime: number;
}
export enum Priority {
    Low = 1,
    Medium = 2,
    High = 3
}
