import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { Priority, Task } from 'src/app/interfaces/task';
import { ApiService } from 'src/app/services/api.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  Priority = Priority;

  constructor(
    private apiService: ApiService,
    private taskService: TaskService
  ) {
    this.taskForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      priority: new FormControl('', Validators.required),
    });
    const nameControl = this.taskForm.get('name');
    this.taskForm.get('priority')?.valueChanges.subscribe((value) => {
      if (value != Priority.High) {
        nameControl?.setValidators([Validators.required, Validators.maxLength(30)]);
      } else {
        nameControl?.setValidators([Validators.required]);
      }
      nameControl?.updateValueAndValidity();
    });
  }

  create() {
    if (this.taskForm.invalid) {
      return;
    }

    const task: Task = {
      id: null,
      name: this.taskForm.value.name,
      priority: this.taskForm.value.priority,
      spendTime: 0,
      totalTime: 1800,
      done: false
    };

    this.apiService.createTask(task).pipe(
      tap(({ id }) => {
        task.id = id;
        this.taskService.addTask(task);
        this.taskForm.reset();
      }),
      map(() => 'Successfully Created'),
    ).subscribe();
  }
}
