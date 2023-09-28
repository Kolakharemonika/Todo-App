import { InjectionToken } from '@angular/core';
import { IAppConfig } from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

const data: IAppConfig = {

  // host: 'https://jsonplaceholder.typicode.com',

  endpoints: {
    fetchTodoListUrl: 'https://jsonplaceholder.typicode.com/todos'
  },

  messages: {},
};

export const AppTodoConfig: IAppConfig = data;
