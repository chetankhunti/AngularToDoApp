import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass'],
  providers: [TodoService]

})
export class TodoComponent implements OnInit {
  public todos;
  public activeTasks;
  public path;
  public newTodo;

  addTodo() {
  this.todoService.add({ title: this.newTodo, isDone: false }).then(() => {
    return this.getTodos();
  }).then(() => {
    this.newTodo = ''; // clear input form value
  });
}

clearCompleted() {
  this.todoService.deleteCompleted().then(() => {
    return this.getTodos();
  });
}


updateTodo(todo, newValue) {
  todo.title = newValue;
  return this.todoService.put(todo).then(() => {
    todo.editing = false;
    return this.getTodos();
  });
}

destroyTodo(todo) {
  this.todoService.delete(todo).then(() => {
    return this.getTodos();
  });
}




constructor(private todoService: TodoService, private route: ActivatedRoute) { }

getTodos(query = ''){
  return this.todoService.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
    });
  }

  
  toggleTodo(todo) {
    this.todoService.toggle(todo).then(() => {
      return this.getTodos();
    });
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }

}
