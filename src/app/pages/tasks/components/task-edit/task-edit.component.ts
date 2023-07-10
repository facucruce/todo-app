import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Priority, Task } from 'src/app/interfaces/task';
import { ApiService } from 'src/app/services/api.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  task!: Task;
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
      if (value !== Priority.High) {
        nameControl?.setValidators([Validators.required, Validators.maxLength(30)]);
      } else {
        nameControl?.setValidators([Validators.required]);
      }
      nameControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.taskService.tasksSelected$.subscribe((task) => {
      if (task) {
        this.task = task;
      }
      this.taskForm.patchValue(this.task);
    });
  }

  submitForm() {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        id: this.task.id,
        name: this.taskForm.value.name,
        priority: this.taskForm.value.priority,
        spendTime: this.task.spendTime,
        totalTime: this.task.totalTime,
        done: this.task.done,
      };
      if (this.task.id) {
        this.apiService.putOne(this.task.id, updatedTask).pipe(
          tap(() => {
            this.taskService.updateTask(updatedTask);
          })
        ).subscribe()
      }
    }
  }


  deleteTaks(task: Task) {
    if (task.id) {
      this.apiService.deleteTask(task.id).pipe(
        tap(() => {
          this.taskService.removeTask(task);
          this.closeEdit()
        })
      ).subscribe();
    }
  }

  closeEdit() {
    this.taskService.setTaskSelected(null);
  }
}
