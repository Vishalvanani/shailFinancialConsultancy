import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { base_URL } from '../app-constant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(
    private http: HttpClient
    ) { }


  post(url: string, data: any): Observable<any> {

    return this.http
      .post(base_URL + url, data);
  }


  put(url: string, data: any): Observable<any> {

      return this.http
        .put<any>(base_URL + url, data);
  }

  get(url: string): Observable<any> {

      return this.http
        .get<any>(base_URL + url);
  }

  delete(url: string): Observable<any> {

      return this.http
        .delete<any>(base_URL + url);
  }
}
