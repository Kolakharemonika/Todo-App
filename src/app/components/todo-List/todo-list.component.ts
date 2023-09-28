import { Component, OnInit } from '@angular/core';
import { TodoLists } from 'src/shared/models/tasklist';
import { UserService } from 'src/shared/services/user-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})

export class AppTodoListComponent implements OnInit {

  listOfTodos: TodoLists[] = [];
  completed: boolean = false;
  loader: boolean = false;
  todoId: number = 1;
  todoTitleValue: string = '';
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.fetchTodoListData();
  }


  fetchTodoListData() {
    this.loader = true;
    this.userService.fetchTodoList().then((resp: any) => {
      // console.log(resp);
      this.listOfTodos = resp;
      console.log(this.listOfTodos);
      this.loader = false;
    }, (err) => {
      if (err.message) {
        console.log('something went wrong');
      }
      this.loader = false;
    })
  }

  onDeleteTodoItem(id: any) {
    this.listOfTodos = this.listOfTodos.filter(todo => todo.id != id);
  }

  onCompletedTodo(selectedTodo: any) {
    this.listOfTodos = this.listOfTodos.map(todo => {
      if (todo.id == selectedTodo.id) { todo.completed = selectedTodo.completed; }
      return todo;
    });
  }

  addTodoItem(e: Event) {
    e.preventDefault();

    if (this.todoTitleValue) {
      if (this.listOfTodos.length > 0) {
        this.listOfTodos.find((todo, index) => {
          if (index == (this.listOfTodos.length - 1)) {
            this.todoId = todo.id;
          }
        });
      } else {
        this.todoId = 1;
      }

      this.todoId++;

      this.listOfTodos.push({
        "id": this.todoId,
        "title": this.todoTitleValue,
        "completed": false
      },);

      this.todoTitleValue = '';
      console.log(this.listOfTodos);
    }
  }

}
