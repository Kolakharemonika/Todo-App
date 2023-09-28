import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getApi(url: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return new Promise((resolve, reject) => {
      this.http.get(url, { headers: headers })
        .pipe(map(res => res as {}))
        .subscribe(res => {
          resolve(res);
        }, error => {
          reject(error);
        });
    });
  }


}
