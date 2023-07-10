import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  selectedTask!: Task | null;
  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit(): void {
    this.taskService.tasksSelected$.pipe(
      tap((task) => this.selectedTask = task)
    ).subscribe();
  }
}
