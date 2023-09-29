// Angular modules imports
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api-service';
import { UserService } from './services/user-service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    HttpClientModule,],
  providers: [
    ApiService,
    UserService
  ],
})
export class SharedModule { }
