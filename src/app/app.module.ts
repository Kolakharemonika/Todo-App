import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../shared/shared.module';
import { AppTodoListComponent } from './components/todo-List/todo-list.component';
import { AppTodoComponent } from './components/todo/todo.component';


@NgModule({
  declarations: [
    AppComponent,
    AppTodoListComponent,
    AppTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
