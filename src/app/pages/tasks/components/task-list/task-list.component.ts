import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, of, take, tap } from 'rxjs';
import { Task } from 'src/app/interfaces/task';
import { ApiService } from 'src/app/services/api.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  searchControl = new FormControl('');
  filteredTasks: Task[] = [];
  showNoTasksMessage: boolean = false;
  @Output() taskSelected = new EventEmitter<Task>();

  constructor(
    private apiService: ApiService,
    public taskService: TaskService
  ) {
  }

  ngOnInit(): void {
    this.apiService.getTasks().pipe(
      tap((task) => this.taskService.setTasks(task)),
    ).subscribe();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      tap((searchText) => {
        if (searchText && searchText.length >= 3) {
          this.filteredTasks = this.taskService.tasks$.value.filter((task) =>
            task.name.toLowerCase().includes(searchText.toLowerCase())
          );
          this.showNoTasksMessage = this.filteredTasks.length === 0;
        } else {
          this.filteredTasks = [];
          this.showNoTasksMessage = false; // Reiniciar el valor de showNoTasksMessage
        }
      })
    ).subscribe();

  }

  card(task:Task) {
    console.log({ task });
    this.taskSelected.emit(task)
  }

  elresto(text: string, $event: MouseEvent) {
    $event.stopPropagation();
    console.log({ text });
  }
  deleteTaks($event: MouseEvent, task: Task) {
    $event.stopPropagation()
    if (task.id) {
      this.apiService.deleteTask(task.id).pipe(
        tap(() => {
          this.taskService.removeTask(task);
        })
      ).subscribe();
    }
  }
  taskTimerStop(task: Task, remainingTime: number) {
    task.remainingTime = remainingTime;
    if (task.id) {
      this.apiService.putOne(task.id, task).pipe(
        take(1),
        catchError(() => of(alert("Ups! Can't save time progress"))),
      ).subscribe();
    }

  }
}
