import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoLists } from 'src/shared/models/tasklist';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class AppTodoComponent implements OnInit {

  @Input() todoInput: TodoLists | any;
  @Output() deleteTodoItem: EventEmitter<any> = new EventEmitter();
  @Output() completedTodo: EventEmitter<any> = new EventEmitter();

  completed: any;
  showModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.completed = this.todoInput.completed;
  }

  onChange() {
    this.completed = !this.completed;
    this.completedTodo.emit({ id: this.todoInput.id, completed: this.completed })
  }

  onDeleteTodoItem() {
    this.deleteTodoItem.emit(this.todoInput.id);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
