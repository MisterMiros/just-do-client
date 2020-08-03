import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../objects/entities/todo';
import { Priority } from '../../objects/primitives/priority.enum';
import { TodoDataService } from '../../services/data/todo-data.service';
import { DATE_FORMAT } from '../../app.constants';
import { PutTodoRequest } from '../../objects/requests/put-todo-request';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  private dateFormat = DATE_FORMAT;

  @Input()
  public todo: Todo;

  @Output()
  public updated = new EventEmitter<void>();

  @Output()
  public deleted = new EventEmitter<void>();

  @Output()
  public error = new EventEmitter<string>();

  private priority = Priority;

  constructor(
    private todoDataService: TodoDataService
  ) { }

  ngOnInit() {
  }

  dateChanged(value) {
    this.todo.dueDate = new Date(value);
  }

  updateDate() {
    let request = new PutTodoRequest();
    request.dueDate = this.todo.dueDate;
    this.todoDataService.update(this.todo.id, request).subscribe(
      (response) => {
        this.updated.emit();
      },
      (response) => {
        this.error.emit(response.error.message);
      }
    );
  }

  updatePriority() {
    let request = new PutTodoRequest();
    request.priority = this.todo.priority;
    this.todoDataService.update(this.todo.id, request).subscribe(
      (response) => {
        this.updated.emit();
      },
      (response) => {
        this.error.emit(response.error.message);
      }
    );
  }

  updateDone() {
    let request = new PutTodoRequest();
    request.done = this.todo.done;
    this.todoDataService.update(this.todo.id, request).subscribe(
      (response) => {
        this.updated.emit();
      },
      (response) => {
        this.error.emit(response.error.message);
      }
    );
  }

  delete() {
    this.todoDataService.delete(this.todo.id).subscribe(
      (response) => {
        this.deleted.emit();
      }, (response) => {
        this.error.emit(response.error.message);
      });
  }

}
