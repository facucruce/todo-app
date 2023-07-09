import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(
    private httpClient: HttpClient
  ) { }
  
  getTasks(): Observable<Task[]> {
    return this.httpClient.get(this.apiUrl) as Observable<Task[]>;
  }

  putOne(id: number, task: Task): Observable<Task> {
    return this.httpClient.put(this.apiUrl + "/" + +id, task) as Observable<Task>;
  }

  createTask(task: Task): Observable<Task> {
    return this.httpClient.post(this.apiUrl, task) as Observable<Task>;
  }

  deleteTask(taskId: number): Observable<Task> {
    return this.httpClient.delete(this.apiUrl + "/" + +taskId) as Observable<Task>;
  }
}
