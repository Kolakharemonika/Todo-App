import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { AppConfig } from '../config/app.config';
import { TodoLists } from '../models/tasklist';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public apiService: ApiService) { }

  fetchTodoList() {
    return new Promise((resolve, reject) => {
      this.apiService.getApi(AppConfig.endpoints.fetchTodoListUrl)
        .then((resp: any) => {
          resolve(resp)
        }, (error) => {
          reject(error);
        });
    });
  }

  // deleteTodoItem(id: number) {

  // }

}
