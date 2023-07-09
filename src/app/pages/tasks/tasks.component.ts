import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  selectedTask!: Task;
  constructor() {
  }

  ngOnInit(): void {
  }
  setSelectTask(task: Task) {
    this.selectedTask = task;
  }
}
