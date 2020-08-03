import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../objects/entities/todo';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Priority } from '../../objects/primitives/priority.enum';
import { PostTodoRequest } from '../../objects/requests/post-todo-request';
import { TodoDataService } from '../../services/data/todo-data.service';
import { formatDate } from '@angular/common';
import { DATE_FORMAT } from '../../app.constants';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  private priorityEnum = Priority;

  private title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  private description = new FormControl('');
 
  private priority = new FormControl(Priority.None);

  private dueDate = new FormControl(formatDate(new Date(), DATE_FORMAT, 'en_US'), [
    Validators.required
  ]);

  private formGroup = new FormGroup({
    title: this.title,
    description: this.description,
    priority: this.priority,
    dueDate: this.dueDate
  });


  @Output()
  public added = new EventEmitter<Todo>();

  @Output()
  public error = new EventEmitter<string>();

  constructor(
    private todoDataService: TodoDataService
  ) { }

  ngOnInit() {
  }

  reset() {
    this.title.setValue('');
    this.description.setValue('');
    this.priority.setValue(Priority.None);
    this.dueDate.setValue(formatDate(new Date(), DATE_FORMAT, 'en_US'))
  }

  submit() {
    const request = new PostTodoRequest();
    request.title = this.title.value;
    request.description = this.description.value;
    request.priority = this.priority.value;
    request.dueDate = new Date(this.dueDate.value);
    this.todoDataService.create(request).subscribe(
      (response) => {
        this.reset();
        this.added.emit(response);
      },
      (response) => {
        this.error.emit(response.message);
      }
    );
  }

}
