import { Component, OnInit } from '@angular/core';
import { TodoLists } from '../../../shared/models/tasklist';
import { UserService } from '../../../shared/services/user-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})

export class AppTodoListComponent implements OnInit {
  showModal: boolean = false;
  completed: boolean = false;
  loader: boolean = false;

  listOfTodos: TodoLists[] = [];
  listOfTodoPerPage: TodoLists[] = [];
  todoId: number = 1;
  todoTitleValue: string = '';

  // pagination
  itemsPerPage = 10; // Number of items to display per page
  currentPage = 1;
  data: any[] = [];

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
      this.loader = false;

      if (err.message) {
        alert('OOPs! Something went wrong ')
        console.log('OOPs! Something went wrong ', err.message);
      }
    })

  }

  onDeleteTodoItem(id: any) {
    this.listOfTodos = this.listOfTodos.filter(todo => todo.id != id);
    this.paginatedData();

    setTimeout(() => {
      alert('Todo deleted successfully!');
    }, 0);
  }

  onCompletedTodo(selectedTodo: any) {
    this.listOfTodos = this.listOfTodos.map(todo => {
      if (todo.id == selectedTodo.id) { todo.completed = selectedTodo.completed; }
      return todo;
    });
  }

  addTodoItem() {

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

      setTimeout(() => {
        alert('Todo successfully added!');
      }, 0);
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
    this.listOfTodoPerPage = this.listOfTodos.slice(startIndex, endIndex);
    console.log(this.listOfTodoPerPage);

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
