import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$ = new BehaviorSubject<Task[]>([]);
  tasksSelected$ = new BehaviorSubject<Task | null>(null); 
  constructor() { }

  setTasks(task: Task[]) {
    this.tasks$.next(task);
  }

  addTask(task: Task) {
    const currentTasks = this.tasks$.getValue();
    const updatedTasks = [...currentTasks, task];
    this.tasks$.next(updatedTasks);
  }

  updateTask(updatedTask: Task) {
    const currentTasks = this.tasks$.getValue();
    const updatedTasks = currentTasks.map(task => {
      if (task.id === updatedTask.id) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
    this.tasks$.next(updatedTasks);
  }

  removeTask(task: Task) {
    const currentTasks = this.tasks$.getValue();
    const updatedTasks = currentTasks.filter(t => t.id !== task.id);
    this.tasks$.next(updatedTasks);
  }

  setTaskSelected(task: Task | null) {
    this.tasksSelected$.next(task);
    console.log(this.tasksSelected$.value);
    
  }

}
