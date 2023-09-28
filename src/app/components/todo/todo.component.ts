import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoLists } from 'src/shared/models/tasklist';
import { UserService } from 'src/shared/services/user-service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class AppTodoComponent implements OnInit {
  @Input() todoInput: TodoLists | any;
  @Output() deleteTodoItem: EventEmitter<any> = new EventEmitter();
  @Output() completedTodo: EventEmitter<any> = new EventEmitter();

  completed: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.completed = this.todoInput.completed;
  }

  onChange(id: number) {
    this.completed = !this.completed;
    this.completedTodo.emit({ id: id, completed: this.completed })
  }
  onDeleteTodoItem(id: number) {
    this.deleteTodoItem.emit(id)
  }
}
