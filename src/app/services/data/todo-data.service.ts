import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Todo } from '../../objects/entities/todo';
import { PostTodoRequest } from '../../objects/requests/post-todo-request';
import { PutTodoRequest } from '../../objects/requests/put-todo-request';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${API_URL}/api/todos`)
      .pipe(map((response) => {
        for (let todo of response) {
          todo.dueDate = new Date((todo.dueDate as unknown) as string);
        }
        return response;
      }));
  }

  getById(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`${API_URL}/api/todos/${id}`)
      .pipe(map((response) => {
        response.dueDate = new Date((response.dueDate as unknown) as string);
        return response;
      }));
  }

  create(createTodo: PostTodoRequest): Observable<Todo> {
    return this.httpClient.post<Todo>(`${API_URL}/api/todos`, createTodo)
      .pipe(map((response) => {
        response.dueDate = new Date((response.dueDate as unknown) as string);
        return response;
      }));
  }

  update(id: number, updateTodo: PutTodoRequest): Observable<any> {
    return this.httpClient.put(`${API_URL}/api/todos/${id}`, updateTodo);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/api/todos/${id}`);
  }
}
