import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoLists } from 'src/shared/models/tasklist';
import { UserService } from 'src/shared/services/user-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})

export class AppTodoListComponent implements OnInit {
  showModal: boolean = false;
  completed: boolean = false;
  loader: boolean = false;

  listOfTodos: TodoLists[] = [];
  listperPage: TodoLists[] = [];
  todoId: number = 1;
  todoTitleValue: string = '';

  // pagination
  itemsPerPage = 10; // Number of items to display per page
  currentPage = 1; // Current page number
  data: any[] = []; // Your data source

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchTodoListData();
  }

  fetchTodoListData() {
    this.loader = true;

    this.userService.fetchTodoList().then((resp: any) => {
      this.listOfTodos = resp;
      console.log(this.listOfTodos);
      this.paginatedData();
      this.loader = false;
    }, (err) => {
      if (err.message) {
        console.log('OOPs! Something went wrong ', err.message);
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
        this.todoId = 0;
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

  //open add todo modal
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  //pagination
  paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.listperPage = this.listOfTodos.slice(startIndex, endIndex);
    console.log(this.listperPage);

  }

  nextPage() {
    this.currentPage++;
    this.paginatedData();
  }

  previousPage() {
    this.currentPage--;
    this.paginatedData();
  }
}
