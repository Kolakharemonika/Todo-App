import { InjectionToken } from '@angular/core';


import { IAppConfig } from './iapp.config';
import { AppTodoConfig } from './apptodo.config';

export let APP_CONFIG = new InjectionToken('app.config');

let envConfig: IAppConfig = AppTodoConfig;

export const AppConfig: IAppConfig = envConfig;
