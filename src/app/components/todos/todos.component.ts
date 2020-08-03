import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../../services/data/todo-data.service';
import { Todo } from '../../objects/entities/todo';
import { BasicAuthenticationService } from '../../services/authentication/basic-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  private todoPages: TodoPage[]

  private error = false
  private errorMessage = ''

  private loading = true

  constructor(
    private todoDataService: TodoDataService,
    private authenticationService: BasicAuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTodos()
  }

  loadTodos() {
    this.loading = true;
    this.todoDataService.get().subscribe(
      (response) => {
        this.processTodos(response);
        this.loading = false;
        this.error = false;
        this.errorMessage = '';
      },
      (response) => {
        this.error = true;
        this.errorMessage = response.error.message;
        this.loading = false;
      }
    );
  }

  processTodos(todos: Todo[]) {
    const pages: TodoPage[] = [];
    for (let todo of todos) {
      const date = new Date(todo.dueDate.toDateString());
      let page = null;
      const found = pages.filter((p) => p.date.getTime() === date.getTime());
      if (found.length > 0) {
        page = found[0];
      } else {
        page = new TodoPage();
        page.date = date;
        page.todos = [];
        pages.push(page);
      }
      page.todos.push(todo);
    }
    this.todoPages = pages;
    console.log(this.todoPages);
  }

  onAdded(todo: Todo) {
    this.loadTodos();
  }

  onUpdated(todoPage: TodoPage, todo: Todo) {
    this.loadTodos();
  }

  onDeleted(todoPage: TodoPage, todo: Todo) {
    this.removeItem(todoPage.todos, todo);
    if (todoPage.todos.length === 0) {
      this.removeItem(this.todoPages, todoPage);
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }


  private removeItem<T>(array: T[], item: T) {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}

class TodoPage {
  public date: Date;
  public todos: Todo[];
}
